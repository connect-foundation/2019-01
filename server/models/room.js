import Player from './player';

class Room {
  constructor() {
    this.fieldRow = 8;
    this.fieldColumn = 16;
    this.playerList = [];
    this.indexOfPlayers = Array(this.fieldColumn).fill(null).map(() => Array(this.fieldRow));
  }

  async enterNewPlayer() {
    const player = new Player();
    const character = await this.assignCharacterToPlayer(player);
    return character;
  }

  async assignCharacterToPlayer(player) {
    const [indexX, indexY] = this.getRandomIndex();
    const character = await player.makeCharacter(indexX, indexY);
    this.indexOfPlayers[indexX][indexY] = player;
    this.playerList.push(player);
    return character;
  }

  getExistCharacters() {
    return this.playerList.map((p) => p.character);
  }

  getRandomIndex() {
    let indexX;
    let indexY;
    do {
      indexX = Math.floor(Math.random() * (this.fieldColumn));
      indexY = Math.floor(Math.random() * (this.fieldRow));
    } while (this.indexOfPlayers[indexX][indexY]);
    return [indexX, indexY];
  }
}

export default Room;
