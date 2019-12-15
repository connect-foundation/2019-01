/* eslint-disable no-underscore-dangle */
import { FIELD } from '../constants/room';

class Thanos {
  constructor() {
    this.ctx = null;
    this.img = null;
  }

  drawImage(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = FIELD.THANOS.IMG;
  }

  draw(sy, fieldXValue) {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      FIELD.THANOS.WIDTH,
      sy,
      fieldXValue,
      FIELD.THANOS.HEIGHT - sy,
      FIELD.THANOS.WIDTH,
      sy,
    );

    if (sy >= FIELD.THANOS.HEIGHT) {
      setTimeout(() => {
        this._clear(sy, fieldXValue);
      }, FIELD.THANOS.TIME);
      return;
    }

    window.requestAnimationFrame(() => {
      this._clear(sy);
      this.draw(sy + FIELD.THANOS.HEIGHT_TERM);
    });
  }

  _clear(sy, fieldXValue) {
    this.ctx.clearRect(
      fieldXValue,
      FIELD.THANOS.HEIGHT - sy,
      FIELD.THANOS.WIDTH,
      sy,
    );
  }
}

export default Thanos;
