import imageFinder from '../database/image';
/**
 * A Player Class
 * @property {Character} Character
 */
class Player {
  constructor() {
    this.character = undefined;
  }

  /**
   *
   * @param {number} indexX
   * @param {number} indexY
   * @returns {Character}
   */
  async makeCharacter(indexX, indexY) {
    [this.character] = await imageFinder.getRandomCharacter();
    [this.character.indexX, this.character.indexY] = [indexX, indexY];
    return this.character;
  }
}

export default Player;
