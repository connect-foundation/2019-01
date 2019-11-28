const ROOM = {
  FIELD_ROW: 8,
  FIELD_COLUMN: 16,
  SECOND: 1000, // 1s
  TIME_LIMIT: 60000, // 60s
  MAX_USER: 20,
};

const DIRECTION = {
  DOWN: 0,
  LEFT: 1,
  RIGHT: 2,
  UP: 3,
};

const FIELD = {
  O_START: 0,
  O_END: 8,
  X_START: 8,
  X_END: 16,
};

export { ROOM, DIRECTION, FIELD };
