export default {
  TILE: {
    WIDTH: 50,
    HEIGHT: 60,
  },
  FIELD: {
    ROW: 8,
    COLUMN: 16,
    BACKGROUND: 'https://kr.object.ncloudstorage.com/connect-2019-01/image/field.png',
  },
  CHARACTER: {
    SIZE: 48,
    WIDTH: 40,
    HEIGHT: 48,
    CROP_OFFSET: 4,
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
  },
  KEYCODE: {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  },
};
