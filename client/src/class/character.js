/* eslint-disable no-underscore-dangle */
import { CHARACTER, TILE } from '../constants/room';

class Character {
  constructor(ctx, imgUrl, indexX, indexY) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = imgUrl;
    this.indexX = indexX;
    this.indexY = indexY;
    this.shape = CHARACTER.SHAPE.STAND;
    this.direction = CHARACTER.DIRECTION.DOWN;
    this.curShapeLoopIdx = 0;
    this.frameCount = 0;
    this.requestId = undefined;

    this.img.onload = () => this._draw();
  }

  move(direction) {
    if (this.requestId) return;
    this.direction = direction;
    this.requestId = window.requestAnimationFrame(() => this._walk());
  }

  _draw() {
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
  }

  _walk() {
    this.frameCount += 1;
    if (this.frameCount < CHARACTER.MOVE_FRAME) {
      this.requestId = window.requestAnimationFrame(() => this._walk());
      return;
    }
    this.frameCount = 0;
    this._clear();
    this._step();
    this._draw();
    if (this.curShapeLoopIdx >= CHARACTER.SHAPE.LOOP.length) {
      this.curShapeLoopIdx = 0;
      this.requestId = undefined;
    } else {
      this.requestId = window.requestAnimationFrame(() => this._walk());
    }
  }

  _step() {
    switch (this.direction) {
      case CHARACTER.DIRECTION.UP:
        this.indexY -= 1 / CHARACTER.SHAPE.LOOP.length;
        break;
      case CHARACTER.DIRECTION.DOWN:
        this.indexY += 1 / CHARACTER.SHAPE.LOOP.length;
        break;
      case CHARACTER.DIRECTION.LEFT:
        this.indexX -= 1 / CHARACTER.SHAPE.LOOP.length;
        break;
      case CHARACTER.DIRECTION.RIGHT:
        this.indexX += 1 / CHARACTER.SHAPE.LOOP.length;
        break;
      default: break;
    }

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
  }
}

export default Character;
