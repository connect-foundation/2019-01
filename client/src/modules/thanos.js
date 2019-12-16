/* eslint-disable no-underscore-dangle */
import { THANOS } from '../constants/room';

class Thanos {
  constructor() {
    this.ctx = null;
    this.img = null;
  }

  injectCtx(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = THANOS.IMG;
  }

  draw(sy, fieldXValue) {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      THANOS.WIDTH,
      sy,
      fieldXValue,
      THANOS.HEIGHT - sy,
      THANOS.WIDTH,
      sy,
    );

    if (sy >= THANOS.HEIGHT) {
      this._stopAndWait(sy, fieldXValue);
      return;
    }

    window.requestAnimationFrame(() => {
      this._clear(sy, fieldXValue);
      this.draw(sy + THANOS.HEIGHT_TERM, fieldXValue);
    });
  }

  _stopAndWait(sy, fieldXValue) {
    setTimeout(() => {
      this._clear(sy, fieldXValue);
    }, THANOS.TIME_MS);
  }

  _clear(sy, fieldXValue) {
    this.ctx.clearRect(
      fieldXValue,
      THANOS.HEIGHT - sy,
      THANOS.WIDTH,
      sy,
    );
  }
}

export default Thanos;
