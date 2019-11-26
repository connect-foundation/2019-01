import imageFinder from '../database/image';

class Character {
  constructor() {
    this.characterUrl = null;
    this.indexX = null;
    this.indexY = null;
  }

  isPlaced() {
    return this.indexX !== null && this.indexY !== null;
  }

  async setCharacterUrl() {
    const [image] = await imageFinder.fetchRandomCharacter();
    this.characterUrl = image.url;
  }

  getCharacterUrl() {
    return this.characterUrl;
  }

  setIndexes(indexX, indexY) {
    this.indexX = indexX;
    this.indexY = indexY;
  }

  getIndexes() {
    return [this.indexX, this.indexY];
  }

  getInfo() {
    return {
      url: this.characterUrl,
      indexX: this.indexX,
      indexY: this.indexY,
    };
  }
}

export default Character;
