/* eslint-disable no-underscore-dangle */
import { THANOS } from '../constants/room';

class Thanos {
  constructor() {
    this.ctx = null;
    this.img = null;
    this.fieldXValue = 0;
    this.thanosTimeoutId = null;
  }

  injectCtx(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = THANOS.IMG;
  }

  setFieldXValue(fieldXValue) {
    this.fieldXValue = fieldXValue;
  }

  draw(sy) {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      THANOS.WIDTH,
      sy,
      this.fieldXValue,
      THANOS.HEIGHT - sy,
      THANOS.WIDTH,
      sy,
    );

    if (sy >= THANOS.HEIGHT) {
      this._stopAndWait(sy);
      return;
    }

    window.requestAnimationFrame(() => {
      this._clear(sy);
      this.draw(sy + THANOS.HEIGHT_TERM);
    });
  }

  _stopAndWait(sy) {
    this.thanosTimeoutId = setTimeout(() => {
      this._clear(sy);
      clearTimeout(this.thanosTimeoutId);
    }, THANOS.TIME_MS);
  }

  _clear(sy) {
    this.ctx.clearRect(
      this.fieldXValue,
      THANOS.HEIGHT - sy,
      THANOS.WIDTH,
      sy,
    );
  }
}

export default Thanos;
