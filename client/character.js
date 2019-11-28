import { CHARACTER, TILE, NICKNAME } from '../constants/room';

class Character {
  constructor(imgUrl, indexX, indexY, nickname, isMine) {
      ...
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