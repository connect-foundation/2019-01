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
  MOVE_FRAME: 3,
  MOVE_FRAME_RELOCATE: 1,
  LAST_FIVE_MOVES: 5,
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
  ENTER: 13,
};

const DASHBOARD = {
  WIDTH: FIELD.getWidth() - TILE.WIDTH,
  HEIGHT: TILE.HEIGHT * 2,
  BACKGROUND: 'https://kr.object.ncloudstorage.com/connect-2019-01/image/dashboard.png',
  SECOND: 1,
  SECOND_MS: 1000,
  BORDER: '2px solid gray',
};

const QUIZ = {
  WIDTH: 550,
  FONT_SIZE: 24,
  LEFT: 40,
};

const COUNTER = {
  WIDTH: 80,
  PADDING: '10px 0',
  RIGHT: 40,
  FONT_SIZE: 28,
  BORDER: '1px solid black',
};

const GAME_START_BUTTON = {
  PADDING: '15px 35px',
  FONT_SIZE: 28,
  BACKGROUND_COLOR: 'gold',
  BOX_SHADOW: '0px 4px 10px 0px',
  BOX_SHADOW_CLICKED: '0px 2px 5px 0px',
};

const CHAT_AREA = {
  BG_COLOR: 'rgba(255, 255, 255, 0.2)',
  WIDTH: 280,
  FONT_SIZE: 15,
  MAX_MESSAGE_LENGTH: 50,
  BOX_SHADOW: '1px 1px 0px dimgrey',
  BUTTON_COLOR: 'rgba(255, 255, 255, 0.5)',
  EMOJI_URL_PLAYER: 'https://kr.object.ncloudstorage.com/connect-2019-01/image/player-emoji.png',
  EMOJI_URL_VIEWER: 'https://kr.object.ncloudstorage.com/connect-2019-01/image/viewer-emoji.png',
  BORDER: '1px solid lightslategrey',
};

const ROOM = {
  MARGIN: 20,
  getWidth() { return FIELD.getWidth() + CHAT_AREA.WIDTH + this.MARGIN; },
  getHeight() { return FIELD.getHeight() + DASHBOARD.HEIGHT + this.MARGIN; },
  WAITING_TIME_MS: 3000,
  BORDER_RADIUS_SMALL: 8,
  BORDER_RADIUS_BIG: 12,
  FONT_FAMILY: 'DungGeunMo',
  BUTTON_HOVER_EFFECT: 'linear-gradient(-180deg, rgba(150, 150, 150, 0.1), rgba(150, 150, 150, 0.2) 50%)',
};

export {
  TILE, FIELD, CHARACTER, KEYCODE, DASHBOARD, CHAT_AREA,
  ROOM, QUIZ, COUNTER, GAME_START_BUTTON, NICKNAME,
};
