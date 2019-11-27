import imageFinder from '../database/image';

/**
 * Character class
 * @property {string} url
 * @property {number} indexX
 * @property {number} indexY
 */
class Character {
  constructor() {
    this.url = null;
    this.indexX = null;
    this.indexY = null;
  }

  /**
   * 캐릭터가 놓여져 있는지 아닌지를 반환하는 함수
   * @returns {Boolean}
   */
  isPlaced() {
    return this.indexX !== null && this.indexY !== null;
  }

  /**
   * 랜덤한 캐릭터 이미지를 데이터베이스로부터 가져와서
   * 자신의 url에 할당한다.
   */
  async setUrl() {
    const [image] = await imageFinder.fetchRandomCharacter();
    this.url = image.url;
  }

  /**
   * 캐릭터 이미지 url을 반환
   * @returns {string}
   */
  getUrl() {
    return this.url;
  }

  /**
   * 넘겨받은 좌표를 instance내 좌표에 할당함
   * @param {number} indexX
   * @param {number} indexY
   */
  setIndexes(indexX, indexY) {
    this.indexX = indexX;
    this.indexY = indexY;
  }

  /**
   * 현재 위치 좌표를 반환
   * @returns {array.<number, number>}
   */
  getIndexes() {
    return [this.indexX, this.indexY];
  }

  /**
   * @returns {{url:string, indexX: number, indexY: number}}
   */
  getInfo() {
    return {
      url: this.url,
      indexX: this.indexX,
      indexY: this.indexY,
    };
  }
}

export default Character;
