/* eslint-disable no-underscore-dangle */
import { FIELD } from '../constants/room';

class Thanos {
  constructor(fieldXValue, killCharacters) {
    this.ctx = null;
    this.img = null;
    this.fieldXValue = fieldXValue;
    this.killCharacters = killCharacters;
  }

  drawImage(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = FIELD.THANOS.IMG;
    this.img.onload = () => this._draw(0);
  }

  _draw(sy) {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      FIELD.THANOS.WIDTH,
      sy,
      this.fieldXValue,
      FIELD.THANOS.HEIGHT - sy,
      FIELD.THANOS.WIDTH,
      sy,
    );

    if (sy >= FIELD.THANOS.HEIGHT) {
      setTimeout(() => {
        this.killCharacters();
        this._clear(sy);
      }, FIELD.THANOS.TIME);
      return;
    }

    window.requestAnimationFrame(() => {
      this._clear(sy);
      this._draw(sy + 10);
    });
  }

  _clear(sy) {
    this.ctx.clearRect(
      this.fieldXValue,
      FIELD.THANOS.HEIGHT - sy,
      FIELD.THANOS.WIDTH,
      sy,
    );
  }
}

export default Thanos;
