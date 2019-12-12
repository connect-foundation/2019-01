/* eslint-disable no-underscore-dangle */
import { FIELD } from '../constants/room';

class Thanos {
  constructor(fieldXValue) {
    this.ctx = null;
    this.img = null;
    this.fieldXValue = fieldXValue;
    this.imgUrl = FIELD.THANOS;
    this.frameCount = 0;
  }

  drawImage(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = this.imgUrl;
    this.img.onload = () => this._draw(0);
  }

  _draw(sy) {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      400,
      sy,
      this.fieldXValue,
      480 - sy,
      400,
      sy,
    );

    if (sy >= 480) {
      setTimeout(() => this._clear(sy), 1000);
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
      480 - sy,
      400,
      sy,
    );
  }
}

export default Thanos;
