export const TILE = {
  WIDTH: 50,
  HEIGHT: 60,
};

export const FIELD = {
  ROW: 8,
  COLUMN: 16,
  getWidth() { return TILE.WIDTH * this.COLUMN; },
  getHeight() { return TILE.HEIGHT * this.ROW; },
  BACKGROUND: 'https://kr.object.ncloudstorage.com/connect-2019-01/image/field.png',
};

export const CHARACTER = {
  SIZE: 48,
  getWidth() { return this.SIZE - this.CROP_OFFSET * 2; },
  getHeight() { return this.SIZE; },
};

export const DASHBOARD = {
  WIDTH: FIELD.getWidth(),
  HEIGHT: TILE.HEIGHT * 2,
  BORDER_RADIUS: 12,
  BORDER: '2px solid gray',
  CLOCK_COLOR_ARRAY: ['red', 'red', 'orange', 'orange', 'green', 'green', 'blue'],
};

export const QUIZ = {
  WIDTH: 550,
  FONT_SIZE: 24,
  LEFT: 40,
};

export const COUNTER = {
  WIDTH: 80,
  PADDING: '10px 0',
  RIGHT: 40,
  FONT_SIZE: 28,
  BORDER_RADIUS: 8,
  BORDER: '1px solid black',
};

export const GAME_START_BUTTON = {
  PADDING: '15px 35px',
  FONT_SIZE: 28,
  BACKGROUND_COLOR: 'gold',
  BOX_SHADOW: '0px 4px 10px 0px',
  BOX_SHADOW_CLICKED: '0px 2px 5px 0px',
};

export const CHAT_AREA = {
  BG_COLOR: 'rgba(255, 255, 255, 0.2)',
  WIDTH: 280,
  getHeight() { return FIELD.getHeight() + DASHBOARD.HEIGHT + this.MARGIN; },
  FONT_SIZE: 15,
  BOX_SHADOW: '1px 1px 0px dimgrey',
  BUTTON_COLOR: 'rgba(255, 255, 255, 0.5)',
  BORDER: '1px solid lightslategrey',
  BORDER_RADIUS: 8,
  CHAT_HEADER: {
    PERCENT_WIDTH: 100,
    PERCENT_HEIGHT: 8,
  },
  ROOM_INFO: {
    PERCENT_WIDTH: 50,
    PERCENT_HEIGHT: 100,
  },
  PLAYER_INFO: {
    PERCENT_WIDTH: 45,
    PERCENT_HEIGHT: 100,
  },
  EMOJI: {
    PERCENT_WIDTH: 40,
    PERCENT_HEIGHT: 50,
  },
  EXIT_BUTTON: {
    PERCENT_WIDTH: 25,
    PERCENT_HEIGHT: 100,
  },
  CHAT_LOG: {
    PERCENT_WIDTH: 100,
    PERCENT_HEIGHT: 75,
  },
  CHAT_INPUT: {
    PERCENT_WIDTH: 100,
    PERCENT_HEIGHT: 8,
  },
  CHAT_INPUT_BOX: {
    PERCENT_WIDTH: 72,
    PERCENT_HEIGHT: 100,
  },
  SEND_BUTTON: {
    PERCENT_WIDTH: 25,
    PERCENT_HEIGHT: 100,
  },
};

export const SOUND_TOGGLE = {
  HEIGHT: 30,
  FONT_SIZE: 20,
  PADDING_RIGHT: 5,
};

export const ROOM = {
  MARGIN: 20,
  getWidth() { return FIELD.getWidth() + CHAT_AREA.WIDTH + this.MARGIN; },
  getHeight() { return FIELD.getHeight() + DASHBOARD.HEIGHT + this.MARGIN; },
  BORDER_RADIUS_SMALL: 8,
  BORDER_RADIUS_BIG: 12,
  FONT_FAMILY: 'DungGeunMo',
  BUTTON_HOVER_EFFECT: 'linear-gradient(-180deg, rgba(150, 150, 150, 0.1), rgba(150, 150, 150, 0.2) 50%)',
  BACKGROUND_GIF: 'https://kr.object.ncloudstorage.com/connect-2019-01/image/transparent-gfllffmJEBXju33FPg.gif',
};

export const ROOM_NAME = {
  WIDTH: 1000,
  FONT_SIZE: 30,
  COLOR: 'dimgray',
  WRAPPER_MARGIN: '5px 0',
  WRAPPER_WIDTH: CHAT_AREA.WIDTH - 30,
  REGEX: {
    HANGUL: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,
    EMOJI: /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
  },
  FONT_WIDTH: {
    HANGUL: 30,
    EMOJI: 30,
    OTHERS: 16,
  },
};
