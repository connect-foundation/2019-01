import imageFinder from '../database/image';

class Player {
  constructor() {
    this.character = undefined;
  }

  async makeCharacter(indexX, indexY) {
    [this.character] = await imageFinder.getRandomCharacter();
    [this.character.indexX, this.character.indexY] = [indexX, indexY];
    return this.character;
  }
}

export default Player;
