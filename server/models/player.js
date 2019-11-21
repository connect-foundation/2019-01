import imageFinder from '../database/image';

class Player {
  constructor(socketId) {
    this.socketId = socketId;
    this.character = null;
  }

  async makeCharacter(indexX, indexY) {
    [this.character] = await imageFinder.getRandomCharacter();
    [this.character.indexX, this.character.indexY] = [indexX, indexY];
    return this.character;
  }
}

export default Player;
