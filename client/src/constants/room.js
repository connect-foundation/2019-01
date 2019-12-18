export const TILE = {
  WIDTH: 50,
  HEIGHT: 60,
};

export const FIELD = {
  ROW: 8,
  COLUMN: 16,
  getWidth() { return TILE.WIDTH * this.COLUMN; },
  getHeight() { return TILE.HEIGHT * this.ROW; },
  BACKGROUND: 'https:kr.object.ncloudstorage.com/connect-2019-01/image/field.png',
};

export const THANOS = {
  IMG: 'https:kr.object.ncloudstorage.com/connect-2019-01/image/field-thanos.png',
  TIME_MS: 2000,
  HEIGHT_TERM: 10,
  TRUE_X: 0,
  FALSE_X: FIELD.getWidth() / 2,
  WIDTH: FIELD.getWidth() / 2,
  HEIGHT: FIELD.getHeight(),
};

export const CHARACTER = {
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

export const CHAT_BALLOON = {
  WIDTH: TILE.WIDTH * 2.5,
  LINE_HEIGHT: 15,
  PADDING_TOP: 3,
  PADDING_BOTTOM: 3,
  PADDING_LEFT: 5,
  PADDING_RIGHT: 5,
  BORDER_WIDTH: 3,
  BORDER_RADIUS: 5,
  getTextWidth() { return this.WIDTH - this.PADDING_LEFT - this.PADDING_RIGHT; },
  TIP_WIDTH: 3,
  TIP_HEIGHT: 5,
  MAX_LINE_COUNT: 5,
  FONT: '13px nanoom',
  ALIGN: 'center',
  BASELINE: 'middle',
  BACKGROUND_COLOR: 'rgba(255, 255, 255, 0.3)',
  CLEAR_TIME_MS: 3000,
};

export const NICKNAME = {
  WIDTH: TILE.WIDTH * 1.5,
  HEIGHT: TILE.HEIGHT / 3,
  FONT: '13px nanoom',
  ALIGN: 'center',
  BASELINE: 'middle',
  MINE_COLOR: 'yellow',
  OTHER_COLOR: 'white',
  BG_COLOR: 'rgba(0, 0, 0, 0.6)',
};

export const KEYCODE = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ENTER: 13,
};

export const DASHBOARD = {
  BACKGROUND: 'https:kr.object.ncloudstorage.com/connect-2019-01/image/dashboard.png',
  SECOND: 1,
  SECOND_MS: 1000,
};


export const CHAT_AREA = {
  MAX_MESSAGE_LENGTH: 50,
  BOX_SHADOW: '1px 1px 0px dimgrey',
  BUTTON_COLOR: 'rgba(255, 255, 255, 0.5)',
  EMOJI_URL_PLAYER: 'https://kr.object.ncloudstorage.com/connect-2019-01/image/player-emoji.png',
  EMOJI_URL_VIEWER: 'https://kr.object.ncloudstorage.com/connect-2019-01/image/viewer-emoji.png',
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
  WAITING_TIME_MS: 3000,
  WAITING_SOUND_TIME_MS: 2000,
};

export const ROOM_NAME = {
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
