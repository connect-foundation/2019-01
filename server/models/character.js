import imageFinder from '../database/image';

class Character {
  constructor() {
    this.characterUrl = undefined;
    this.indexX = undefined;
    this.indexY = undefined;
  }

  async setCharacterUrl() {
    const [image] = await imageFinder.fetchRandomCharacter();
    this.characterUrl = image.url;
  }

  getCharacterUrl() {
    return this.characterUrl;
  }

  setIndexies(indexX, indexY) {
    this.indexX = indexX;
    this.indexY = indexY;
  }

  getIndexies() {
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
