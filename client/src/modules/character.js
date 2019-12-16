/* eslint-disable no-param-reassign */
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
    this.nameTagX = 0;
    this.nameTagY = 0;
    this.chatBalloonX = 0;
    this.chatBalloonY = 0;
    this.balloonLineNumber = 0;
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

  setCurrentChat(chatText) {
    this.currentChat = chatText;
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
      clearTimeout(this.chatTimeoutId);
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

  _drawRoundRect(startX, startY, width, lineHeight, radius) {
    let borderRadius = radius;
    const maxHeight = lineHeight * this.balloonLineNumber + CHAT_BALLOON.PADDING_BOTTOM;

    if (width < 2 * borderRadius) borderRadius = width / 2;
    if (lineHeight < 2 * borderRadius) borderRadius = lineHeight / 2;

    this.ctx.fillStyle = 'black';
    this.ctx.linewidthidth = CHAT_BALLOON.BORDER_WIDTH;
    this.ctx.beginPath();
    this.ctx.moveTo(startX + borderRadius, startY);
    this.ctx.arcTo(startX + width, startY, startX + width, startY + maxHeight, borderRadius);
    this.ctx.arcTo(startX + width, startY + maxHeight, startX, startY + maxHeight, borderRadius);
    this.ctx.lineTo(startX + width / 2 + CHAT_BALLOON.TIP_WIDTH, startY + maxHeight);
    this.ctx.lineTo(startX + width / 2, startY + maxHeight + CHAT_BALLOON.TIP_HEIGHT);
    this.ctx.lineTo(startX + width / 2 - CHAT_BALLOON.TIP_WIDTH, startY + maxHeight);
    this.ctx.arcTo(startX, startY + maxHeight, startX, startY, borderRadius);
    this.ctx.arcTo(startX, startY, startX + width, startY, borderRadius);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fillStyle = CHAT_BALLOON.BACKGROUND_COLOR;
    this.ctx.fill();
  }

  _clearChat() {
    this.ctx.clearRect(
      this.chatBalloonX - CHAT_BALLOON.BORDER_WIDTH / 2,
      this.chatBalloonY - CHAT_BALLOON.BORDER_WIDTH / 2,
      CHAT_BALLOON.WIDTH + CHAT_BALLOON.BORDER_WIDTH * 2,
      CHAT_BALLOON.LINE_HEIGHT * this.balloonLineNumber
        + CHAT_BALLOON.BORDER_WIDTH * 2
        + CHAT_BALLOON.TIP_HEIGHT,
    );
    this.balloonLineNumber = null;
  }

  _measureText(chatText) {
    const { width } = this.ctx.measureText(chatText);
    return width;
  }

  /**
   * @param {string} chatText
   * @return {Array.<string>} ['글자길이에맞게반환하', '면됨한글로열글자길이']
   */
  _parseChat(chatText) {
    if (this._measureText(chatText) <= CHAT_BALLOON.getTextWidth()) return [chatText];
    return chatText.split('').reduce((parsedChat, char) => {
      const lastIndex = parsedChat.length - 1;
      const [lastSentence] = parsedChat[lastIndex];
      if (this._measureText(lastSentence + char) > CHAT_BALLOON.getTextWidth()) {
        parsedChat = [...parsedChat, [char]];
        return parsedChat;
      }

      parsedChat[lastIndex] = [lastSentence + char];
      return parsedChat;
    }, [['']]);
  }

  _drawChat() {
    const parsedChat = this._parseChat(this.currentChat);
    this.balloonLineNumber = parsedChat.length;

    this.chatBalloonX = (TILE.WIDTH * this.indexX)
      - ((CHAT_BALLOON.WIDTH - TILE.WIDTH) / 2);

    this.chatBalloonY = TILE.HEIGHT * this.indexY
      - this.balloonLineNumber * CHAT_BALLOON.LINE_HEIGHT
      - CHAT_BALLOON.TIP_HEIGHT - CHAT_BALLOON.BORDER_WIDTH * 2;

    this._drawRoundRect(
      this.chatBalloonX,
      this.chatBalloonY,
      CHAT_BALLOON.WIDTH,
      CHAT_BALLOON.LINE_HEIGHT,
      CHAT_BALLOON.BORDER_RADIUS,
    );

    this.ctx.font = CHAT_BALLOON.FONT;
    this.ctx.textAlign = CHAT_BALLOON.ALIGN;
    this.ctx.textBaseline = CHAT_BALLOON.BASELINE;
    this.ctx.fillStyle = 'black';

    parsedChat.forEach((val, lineOrder) => {
      this.ctx.fillText(
        val,
        this.chatBalloonX + CHAT_BALLOON.WIDTH / 2,
        this.chatBalloonY + (CHAT_BALLOON.LINE_HEIGHT) / 2
          + (lineOrder * CHAT_BALLOON.LINE_HEIGHT)
          + CHAT_BALLOON.PADDING_TOP,
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
