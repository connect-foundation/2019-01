/* eslint-disable no-underscore-dangle */
import nicknameFinder from '../database/nickname';
import quizFinder from '../database/quiz';
import { ROOM, DIRECTION, FIELD } from '../constants/room';

class Room {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.isGameStarted = false;
    this.quizList = [];
    this.currentQuiz = {};
    this.currentRound = 0;
    this.currentTime = 0;
    this.users = new Map();
    this.indexOfCharacters = this._getEmptyIndexMatrix();
    this.nicknameList = [];
    this.aliveUsers = new Map();
  }

  async _fetchRandomNickname() {
    const adjList = await nicknameFinder.fetchAdjList();
    const nounList = await nicknameFinder.fetchNounList();
    for (let idx = 0; idx < adjList.length; idx += 1) {
      this.nicknameList[idx] = `${adjList[idx].adj} ${nounList[idx].noun}`;
    }
  }

  async enterUser(user) {
    this.users.set(user.getId(), user);

    if (this.isGameStarted === false) {
      this._placeCharacter(user);
    }

    if (!this.nicknameList.length) {
      await this._fetchRandomNickname();
    }
    user.setNickname(this.nicknameList.shift());

    const myCharacter = user.getCharacter();
    const characterList = this.makeCharacterList(myCharacter);

    const newUser = { ...characterList[characterList.length - 1], isMine: false };

    this.users.forEach((_user) => {
      if (user === _user) return;
      _user.emitEnterNewUser({ characterList: [newUser] });
    });

    user.emitEnterRoom({
      characterList,
      isGameStarted: this.isGameStarted,
      question: this.currentQuiz.question,
      timeLimit: ROOM.TIME_LIMIT - this.currentTime,
      isOwner: this._isOwner(user),
    });

    this.aliveUsers.set(user.getNickname(), user);
  }


  makeCharacterList(myCharacter) {
    const characterList = [];

    this.users.forEach((_user) => {
      const character = _user.getCharacter();
      if (character.isPlaced() === false) return;
      characterList.push({
        userId: _user.getId(),
        isMine: character === myCharacter,
        nickname: _user.getNickname(),
        ...character.getInfo(),
      });
    });

    return characterList;
  }

  leaveUser(user) {
    const character = user.getCharacter();
    if (character !== null && character.isPlaced()) {
      const [indexX, indexY] = character.getIndexes();
      this.indexOfCharacters[indexX][indexY] = undefined;
      user.deleteCharacter();
    }
    this.nicknameList.push(user.getNickname());
    const userInfo = { nickname: user.getNickname(), isOwner: this._isOwner(user) };

    this.users.delete(user.getId());
    this.aliveUsers.delete(user.getNickname());

    this.users.forEach((_user) => _user.emitLeaveUser({ characterList: [userInfo] }));
  }

  async startGame(user) {
    if (this._isOwner(user) && this.isGameStarted === false) {
      this.isGameStarted = true;
      this.currentRound = 0;
      this.quizList = await quizFinder.fetchQuizList();

      await this._startRound();
    }
  }

  moveCharacter(user, direction) {
    const character = user.getCharacter();
    if (character.isPlaced() === false) return;

    const [oldIndexX, oldIndexY] = character.getIndexes();
    let newIndexX = oldIndexX;
    let newIndexY = oldIndexY;

    switch (direction) {
      case DIRECTION.LEFT: newIndexX -= 1; break;
      case DIRECTION.RIGHT: newIndexX += 1; break;
      case DIRECTION.UP: newIndexY -= 1; break;
      case DIRECTION.DOWN: newIndexY += 1; break;
      default: return;
    }

    const nickname = user.getNickname();
    const canMove = this._canBeMoved(newIndexX, newIndexY);
    this.users.forEach((_user) => {
      _user.emitMove({ canMove, nickname, direction });
    });

    if (canMove) {
      user.character.setIndexes(newIndexX, newIndexY);
      this.indexOfCharacters[oldIndexX][oldIndexY] = undefined;
      this.indexOfCharacters[newIndexX][newIndexY] = user;
    }
  }

  async _startRound() {
    this.currentQuiz = this.quizList[this.currentRound];
    this.currentTime = 0;
    this.indexOfCharacters = this._getEmptyIndexMatrix();
    const characterList = [];

    this.aliveUsers.forEach((user) => {
      const [indexX, indexY] = this._getRandomEmptyIndex();
      const character = user.getCharacter();
      character.setIndexes(indexX, indexY);
      this.indexOfCharacters[indexX][indexY] = user;
      characterList.push({ nickname: user.getNickname(), indexX, indexY });
    });

    this.users.forEach((user) => {
      user.emitStartRound({
        round: this.currentRound,
        question: this.currentQuiz.question,
        timeLimit: ROOM.TIME_LIMIT,
        characterList,
      });
    });

    this._countTime();
  }

  _endRound() {
    const { comment, answer } = this.currentQuiz;
    const dropUsers = this._checkCharactersLocation(this.currentQuiz.answer);
    const endRoundInfos = {
      round: this.currentRound,
      comment,
      answer,
      characterList: dropUsers,
    };

    this.users.forEach((user) => {
      user.emitEndRound(endRoundInfos);
    });

    if (this.aliveUsers.size - dropUsers.length !== 0) {
      dropUsers.forEach((user) => {
        this.aliveUsers.delete(user.nickname);
      });
    }

    if (this.aliveUsers.size === 1 || this.currentRound === ROOM.MAX_ROUND) {
      this.users.forEach((user) => {
        setTimeout(() => user.emitEndGame(), ROOM.WAITING_TIME_MS);
      });
      return;
    }

    this.currentRound += 1;

    setTimeout(() => this._startRound(), ROOM.WAITING_TIME_MS);
  }

  _checkCharactersLocation(answerSide) {
    const [dropStart, dropEnd] = answerSide ? [FIELD.X_START, FIELD.X_END] : [FIELD.O_START, FIELD.O_END];

    const dropUsers = [];

    for (let i = dropStart; i < dropEnd; i += 1) {
      for (let j = 0; j < ROOM.FIELD_ROW; j += 1) {
        const character = this.indexOfCharacters[i][j];
        if (character !== undefined) {
          dropUsers.push({ nickname: character.getNickname(), isOwner: this._isOwner(character) });
          this.indexOfCharacters[i][j] = undefined;
        }
      }
    }
    return dropUsers;
  }

  _placeCharacter(user) {
    const [indexX, indexY] = this._getRandomEmptyIndex();
    const character = user.getCharacter();
    character.setIndexes(indexX, indexY);
    this.indexOfCharacters[indexX][indexY] = user;
  }

  _isOwner(user) {
    const ownerId = this.users.keys().next().value;
    return ownerId === user.getId();
  }

  _countTime() {
    setTimeout(() => {
      this.currentTime += 1;
      if (this.currentTime < ROOM.TIME_LIMIT) {
        return this._countTime();
      }
      this._endRound();
    }, ROOM.SECOND);
  }

  _getRandomEmptyIndex() {
    let indexX;
    let indexY;
    do {
      indexX = Math.floor(Math.random() * (ROOM.FIELD_COLUMN));
      indexY = Math.floor(Math.random() * (ROOM.FIELD_ROW));
    } while (this.indexOfCharacters[indexX][indexY]);
    return [indexX, indexY];
  }

  _getEmptyIndexMatrix() {
    return Array(ROOM.FIELD_COLUMN).fill().map(() => Array(ROOM.FIELD_ROW));
  }

  _canBeMoved(newIndexX, newIndexY) {
    if (newIndexX < 0 || newIndexX >= ROOM.FIELD_COLUMN) return false;
    if (newIndexY < 0 || newIndexY >= ROOM.FIELD_ROW) return false;
    if (this.indexOfCharacters[newIndexX][newIndexY] !== undefined) return false;
    return true;
  }
}

export default Room;