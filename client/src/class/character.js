/* eslint-disable no-underscore-dangle */
import { CHARACTER, TILE, NICKNAME } from '../constants/room';

class Character {
  constructor(imgUrl, indexX, indexY, nickname, isMine) {
    this.ctx = null;
    this.img = null;
    this.imgUrl = imgUrl;
    this.indexX = indexX;
    this.indexY = indexY;
    this.nameTagX = null;
    this.nameTagY = null;
    this.shape = CHARACTER.SHAPE.STAND;
    this.direction = CHARACTER.DIRECTION.DOWN;
    this.curShapeLoopIdx = 0;
    this.frameCount = 0;
    this.requestId = null;
    this.nickname = nickname;
    this.mine = isMine;
    this.moveQueue = [];
  }

  isMine() {
    return this.mine;
  }

  getNickname() {
    return this.nickname;
  }

  drawImage(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = this.imgUrl;
    this.img.onload = () => this._draw();
  }

  isMoving() {
    return this.requestId !== null;
  }

  move(direction, newIndexX, newIndexY) {
    if (this.ctx === null) return;
    if (this.requestId) {
      this.moveQueue.push({ direction, newIndexX, newIndexY });
      return;
    }
    this.direction = direction;
    this.requestId = window.requestAnimationFrame(() => this._walk());
  }

  turn(direction) {
    if (this.ctx === null) return;
    if (this.requestId) return;
    this.direction = direction;
    this._clear();
    this._draw();
  }

  _draw() {
    /*
     * HTML canvas drawImage() Method :
     * context.drawImage(img,startX,startY,startWidth,startheight,x,y,width,height)
     */
    this.ctx.drawImage(
      this.img,
      CHARACTER.SIZE * this.shape + CHARACTER.CROP_OFFSET,
      CHARACTER.SIZE * this.direction,
      CHARACTER.getWidth(),
      CHARACTER.getHeight(),
      TILE.WIDTH * this.indexX,
      TILE.HEIGHT * this.indexY,
      TILE.WIDTH,
      TILE.HEIGHT,
    );

    this._drawNickname();
  }

  _walk() {
    this.frameCount += 1;
    const frameFullCount = (
      this.moveQueue.length > 0
        ? CHARACTER.MOVE_FRAME_RELOCATE
        : CHARACTER.MOVE_FRAME);
    if (this.frameCount < frameFullCount) {
      this.requestId = window.requestAnimationFrame(() => this._walk());
      return;
    }

    this.frameCount = 0;
    this._clear();
    this._step();
    this._draw();

    if (this.curShapeLoopIdx >= CHARACTER.SHAPE.LOOP.length) {
      this.curShapeLoopIdx = 0;
      this.requestId = null;
      this._relocate();
      if (this.moveQueue.length > 0) {
        const { direction } = this.moveQueue.shift();
        this.move(direction);
      }
      return;
    }
    this.requestId = window.requestAnimationFrame(() => this._walk());
  }

  _relocate() {
    if (this.moveQueue.length > CHARACTER.LAST_FIVE_MOVES) {
      this.moveQueue = this.moveQueue.slice(this.moveQueue.length - CHARACTER.LAST_FIVE_MOVES - 1);
      const { direction, newIndexX, newIndexY } = this.moveQueue.shift();
      this._teleport(newIndexX, newIndexY);
      this.turn(direction);
    }
  }

  _teleport(indexX, indexY) {
    this._stop();
    this._clear();
    this.indexX = indexX;
    this.indexY = indexY;
    this._draw();
  }

  _stop() {
    if (this.requestId !== null) window.cancelAnimationFrame(this.requestId);
  }

  _step() {
    const directionOption = {
      [CHARACTER.DIRECTION.UP]: { idx: 'indexY', sign: -1 },
      [CHARACTER.DIRECTION.DOWN]: { idx: 'indexY', sign: 1 },
      [CHARACTER.DIRECTION.LEFT]: { idx: 'indexX', sign: -1 },
      [CHARACTER.DIRECTION.RIGHT]: { idx: 'indexX', sign: 1 },
    };

    const option = directionOption[this.direction];

    if (!option) return;
    this[option.idx] += (option.sign / CHARACTER.SHAPE.LOOP.length);

    this.shape = CHARACTER.SHAPE.LOOP[this.curShapeLoopIdx];
    this.curShapeLoopIdx += 1;
  }

  _clear() {
    this.ctx.clearRect(
      TILE.WIDTH * this.indexX,
      TILE.HEIGHT * this.indexY,
      TILE.WIDTH,
      TILE.HEIGHT,
    );

    this.ctx.clearRect(
      this.nameTagX,
      this.nameTagY,
      NICKNAME.WIDTH + 1,
      NICKNAME.HEIGHT,
    );
  }

  _drawNickname() {
    this.ctx.fillStyle = NICKNAME.BG_COLOR;

    this.nameTagX = (TILE.WIDTH * this.indexX) - ((NICKNAME.WIDTH - TILE.WIDTH) / 2);
    this.nameTagY = TILE.HEIGHT * (this.indexY + 1);

    this.ctx.fillRect(
      this.nameTagX,
      this.nameTagY,
      NICKNAME.WIDTH,
      NICKNAME.HEIGHT,
    );

    this.ctx.font = NICKNAME.FONT;
    this.ctx.textAlign = NICKNAME.ALIGN;
    this.ctx.textBaseline = NICKNAME.BASELINE;
    this.ctx.fillStyle = this.mine ? NICKNAME.MINE_COLOR : NICKNAME.OTHER_COLOR;

    this.ctx.fillText(
      this.nickname,
      this.nameTagX + NICKNAME.WIDTH / 2,
      this.nameTagY + NICKNAME.HEIGHT / 2 + 2,
      NICKNAME.WIDTH,
    );
  }
}

export default Character;
