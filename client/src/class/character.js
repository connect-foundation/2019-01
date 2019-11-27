/* eslint-disable no-underscore-dangle */
import { CHARACTER, TILE, NICKNAME } from '../constants/room';

class Character {
  constructor(ctx, imgUrl, indexX, indexY, nickname, isMine) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = imgUrl;
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
    this.isMine = isMine;

    this.img.onload = () => this._draw();
  }

  getNickname() {
    return this.nickname;
  }

  isMoving() {
    return this.requestId !== null;
  }

  move(direction) {
    if (this.requestId) return;
    this.direction = direction;
    this.requestId = window.requestAnimationFrame(() => this._walk());
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
      this.requestId = null;
      return;
    }
    this.requestId = window.requestAnimationFrame(() => this._walk());
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
    this.ctx.fillStyle = this.isMine ? NICKNAME.MINE_COLOR : NICKNAME.OTHER_COLOR;

    this.ctx.fillText(
      this.nickname,
      this.nameTagX + NICKNAME.WIDTH / 2,
      this.nameTagY + NICKNAME.HEIGHT / 2 + 2,
      NICKNAME.WIDTH,
    );
  }
}

export default Character;
