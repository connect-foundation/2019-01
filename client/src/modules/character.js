/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import {
  CHARACTER, TILE, NICKNAME, CHAT_BALLOON,
} from '../constants/room';

class Character {
  constructor(imgUrl, indexX, indexY, nickname, isMine) {
    this.ctx = null;
    this.img = null;
    this.imgUrl = imgUrl;
    this.indexX = indexX;
    this.indexY = indexY;
    this.nameTagX = null;
    this.nameTagY = null;
    this.chatBalloonX = null;
    this.chatBalloonY = null;
    this.shape = CHARACTER.SHAPE.STAND;
    this.direction = CHARACTER.DIRECTION.DOWN;
    this.curShapeLoopIdx = 0;
    this.frameCount = 0;
    this.requestId = null;
    this.chatTimeoutId = null;
    this.nickname = nickname;
    this.currentChat = '';
    this.mine = isMine;
    this.moveQueue = [];
    this.alive = true;
  }

  setAlive(alive) {
    this.alive = alive;
    if (alive === false) this._clear();
  }

  isAlive() {
    return this.alive;
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

  teleport(indexX, indexY) {
    this._stop();
    this._clear();
    this.indexX = indexX;
    this.indexY = indexY;
    this._draw();
  }

  chat() {
    if (this.chatTimeoutId !== null) clearTimeout(this.chatTimeoutId);
    this._clearChat();
    this._drawChat();
    this.chatTimeoutId = setTimeout(() => {
      this.currentChat = '';
      this._clearChat();
    }, CHAT_BALLOON.CLEAR_TIME_MS);
  }

  _draw() {
    /*
     * HTML canvas drawImage() Method :
     * context.drawImage(img,startX,startY,startWidth,startheight,x,y,width,height)
     */
    if (this.alive === false) return;

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
    if (this.currentChat) this._drawChat(this.currentChat);
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

    if (this.curShapeLoopIdx < CHARACTER.SHAPE.LOOP.length) {
      this.requestId = window.requestAnimationFrame(() => this._walk());
      return;
    }

    this._stop();
    if (this.moveQueue.length > CHARACTER.LAST_FIVE_MOVES) {
      this._relocate();
    }
    if (this.moveQueue.length > 0) {
      const { direction, newIndexX, newIndexY } = this.moveQueue.shift();
      this.move(direction, newIndexX, newIndexY);
    }
  }

  _relocate() {
    this.moveQueue = this.moveQueue.slice(this.moveQueue.length - CHARACTER.LAST_FIVE_MOVES - 1);
    const { direction, newIndexX, newIndexY } = this.moveQueue.shift();
    this.teleport(newIndexX, newIndexY);
    this.turn(direction, newIndexX, newIndexY);
  }

  _stop() {
    if (this.requestId !== null) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = null;
      this.curShapeLoopIdx = 0;
    }
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

    this._clearChat();
  }

  _drawRoundRect(startX, startY, width, height, radius, lineNumber) {
    let borderRadius = radius;
    let _startY = startY;
    const maxHeight = height * lineNumber + CHAT_BALLOON.MARGIN_BOTTOM;

    if (width < 2 * borderRadius) borderRadius = width / 2;
    if (height < 2 * borderRadius) borderRadius = height / 2;
    if (lineNumber) {
      _startY -= height * (lineNumber - 1) + CHAT_BALLOON.MARGIN_TOP;
    }
    this.ctx.fillStyle = 'black';
    this.ctx.linewidthidth = CHAT_BALLOON.BORDER_WIDTH;
    this.ctx.beginPath();
    this.ctx.moveTo(startX + borderRadius, _startY);
    this.ctx.arcTo(startX + width, _startY, startX + width, _startY + maxHeight, borderRadius);
    this.ctx.arcTo(startX + width, _startY + maxHeight, startX, _startY + maxHeight, borderRadius);
    this.ctx.lineTo(startX + width / 2 + CHAT_BALLOON.TIP_WIDTH, _startY + maxHeight);
    this.ctx.lineTo(startX + width / 2, _startY + maxHeight + CHAT_BALLOON.TIP_HEIGHT);
    this.ctx.lineTo(startX + width / 2 - CHAT_BALLOON.TIP_WIDTH, _startY + maxHeight);
    this.ctx.arcTo(startX, _startY + maxHeight, startX, _startY, borderRadius);
    this.ctx.arcTo(startX, _startY, startX + width, _startY, borderRadius);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fillStyle = CHAT_BALLOON.BACKGROUND_COLOR;
    this.ctx.fill();
  }

  _clearChat() {
    const lineNumber = 5;
    this.ctx.clearRect(
      this.chatBalloonX - 25 - CHAT_BALLOON.BORDER_WIDTH,
      this.chatBalloonY - (CHAT_BALLOON.LINE_HEIGHT) * (lineNumber) - CHAT_BALLOON.BORDER_WIDTH * 2,
      CHAT_BALLOON.WIDTH + CHAT_BALLOON.BORDER_WIDTH * 2,
      (CHAT_BALLOON.LINE_HEIGHT) * (lineNumber + 2) + CHAT_BALLOON.BORDER_WIDTH * 2,
    );
  }

  /**
   * @param {string} chatText
   * @return {Array.<string>} ['글자길이에맞게반환하', '면됨한글로열글자길이']
   */
  _parseChat(chatText) {
    const chatTextWidth = this.ctx.measureText(chatText).width;
    if (chatTextWidth <= CHAT_BALLOON.TEXT_WIDTH) return [chatText];
    return chatText.split('').reduce((accumulator, curr) => {
      const accu = accumulator;
      if (this.ctx.measureText(accu[accu.length - 1][0] + curr).width > CHAT_BALLOON.TEXT_WIDTH) {
        accu.push([curr]);
        return accu;
      }

      accu[accu.length - 1][0] += curr;
      return accu;
    }, [['']]);
  }

  _drawChat() {
    const parsedChat = this._parseChat(this.currentChat);
    const balloonHeight = parsedChat.length;

    this.chatBalloonX = (TILE.WIDTH * this.indexX) - ((NICKNAME.WIDTH - TILE.WIDTH) / 2);
    this.chatBalloonY = TILE.HEIGHT * (this.indexY - 1) + 35;

    this.ctx.font = NICKNAME.FONT;
    this.ctx.textAlign = NICKNAME.ALIGN;
    this.ctx.textBaseline = NICKNAME.BASELINE;
    this.ctx.fillStyle = 'black';

    this._drawRoundRect(this.chatBalloonX - 25, this.chatBalloonY, CHAT_BALLOON.WIDTH, CHAT_BALLOON.LINE_HEIGHT, 5, balloonHeight);

    parsedChat.forEach((val, i, arr) => {
      this.ctx.fillStyle = 'black';
      const { length } = arr;
      this.ctx.fillText(
        val,
        this.chatBalloonX + NICKNAME.WIDTH / 2,
        this.chatBalloonY + NICKNAME.HEIGHT / 2 + ((i - length + 1) * (CHAT_BALLOON.LINE_HEIGHT)),
        NICKNAME.WIDTH + 48,
      );
    });
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
