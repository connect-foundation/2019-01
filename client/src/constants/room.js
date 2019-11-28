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

const NICKNAME = {
  WIDTH: TILE.WIDTH * 1.5,
  HEIGHT: TILE.HEIGHT / 3,
  FONT: '13px nanoom',
  ALIGN: 'center',
  BASELINE: 'middle',
  MINE_COLOR: 'yellow',
  OTHER_COLOR: 'white',
  BG_COLOR: 'rgba(0, 0, 0, 0.6)',
};

const KEYCODE = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

const DASHBOARD = {
  WIDTH: FIELD.getWidth() - TILE.WIDTH,
  HEIGHT: TILE.HEIGHT * 2,
  BACKGROUND: 'https://kr.object.ncloudstorage.com/connect-2019-01/image/dashboard.png',
  A_SECOND: 1,
};

const QUIZ = {
  WIDTH: 550,
  FONTSIZE: 24,
  LEFT: 40,
};

const COUNTER = {
  WIDTH: 80,
  PADDING: '10px 0',
  RIGHT: 40,
  FONTSIZE: 28,
};

const GAME_START_BUTTON = {
  PADDING: '15px 35px',
  FONTSIZE: 28,
  BACKGROUND_COLOR: 'gold',
  BOX_SHADOW: '0px 4px 10px 0px',
};

const CHAT_AREA = {
  BG_COLOR: 'rgba(255, 255, 255, 0.1)',
  WIDTH: 280,
};

const ROOM = {
  MARGIN: 20,
  getWidth() { return FIELD.getWidth() + CHAT_AREA.WIDTH + this.MARGIN; },
  getHeight() { return FIELD.getHeight() + DASHBOARD.HEIGHT + this.MARGIN; },
};

export {
  TILE, FIELD, CHARACTER, KEYCODE, DASHBOARD, CHAT_AREA, ROOM, QUIZ, COUNTER, GAME_START_BUTTON, NICKNAME,
};
