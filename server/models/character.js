import imageFinder from '../database/image';

class Character {
  constructor() {
    this.url = null;
    this.indexX = null;
    this.indexY = null;
  }

  isPlaced() {
    return this.indexX !== null && this.indexY !== null;
  }

  async setUrl() {
    const [image] = await imageFinder.fetchRandomCharacter();
    this.url = image.url;
  }

  getUrl() {
    return this.url;
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
      url: this.url,
      indexX: this.indexX,
      indexY: this.indexY,
    };
  }
}

export default Character;
