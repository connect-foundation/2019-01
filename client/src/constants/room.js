const TILE = {
  WIDTH: 50,
  HEIGHT: 60,
};

const FIELD = {
  ROW: 8,
  COLUMN: 16,
  getWidth() { return TILE.WIDTH * this.COLUMN; },
  getHeight() { return TILE.HEIGHT * this.ROW; },
  BACKGROUND: 'https://kr.object.ncloudstorage.com/connect-2019-01/image/field.png',
};

const CHARACTER = {
  SIZE: 48,
  CROP_OFFSET: 4,
  getWidth() { return this.SIZE - this.CROP_OFFSET * 2; },
  getHeight() { return this.SIZE; },
  MOVE_FRAME: 5,
  DIRECTION: {
    DOWN: 0,
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
  },
  SHAPE: {
    STAND: 1,
    MOVE1: 0,
    MOVE2: 2,
    LOOP: [0, 2, 0, 1],
  },
};

const KEYCODE = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

const DASH_BOARD = {
  WIDTH: FIELD.getWidth() - TILE.WIDTH,
  HEIGHT: TILE.HEIGHT * 2,
};

const CHAT_AREA = {
  BG_COLOR: 'rgba(255, 255, 255, 0.1)',
  WIDTH: 280,
};

const ROOM = {
  MARGIN: 20,
  getWidth() { return FIELD.getWidth() + CHAT_AREA.WIDTH + this.MARGIN; },
  getHeight() { return FIELD.getHeight() + DASH_BOARD.HEIGHT + this.MARGIN; },
};

export {
  TILE, FIELD, CHARACTER, KEYCODE, DASH_BOARD, CHAT_AREA, ROOM,
};
