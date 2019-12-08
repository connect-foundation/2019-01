const LOBBY = {
  WIDTH: 800,
  HEIGHT: 620,
  PADDING: '20px',
  BACKGROUND_COLOR: 'rgba(255,255,255,0.2)',
  BORDER: '2px solid lightslategrey',
  BORDER_RADIUS: 8,
  FONT_SIZE: 30,
  ACTION: {
    USER_ENTERED: 'user_entered',
    USER_LEAVED: 'user_leaved',
    GAME_STARTED: 'game_started',
    GAME_ENDED: 'game_ended',
    NO_USERS: 'no_users',
  },
};

const HEADER = {
  HEIGHT: 60,
  PADDING: '0 25px 0 15px',
};

const NICKNAME = {
  FONT_SIZE: 40,
};

const LOGIN_BUTTON = {
  WIDTH: 140,
  HEIGHT: 50,
  PADDING: '5px 10px',
  BORDER: '2px solid lightslategrey',
  BORDER_RADIUS: 8,
  BACKGROUND_COLOR: 'rgba(255,255,255,0.5)',
  GITHUB_ICON: {
    WIDTH: 33,
    HEIGHT: 33,
    SHAPE_REDERING: 'crispEdges',
  },
};

const BODY = {
  HEIGHT: 520,
  PADDING: '5px 15px',
  SCROLLBAR: {
    WIDTH: 10,
    TRACK_COLOR: 'transparent',
    THUMB_COLOR: 'gray',
    THUMB_BORDER_RADIUS: 4,
    THUMB_COLOR_HOVER: 'dimgray',
  },
};

const ROOM_INFO = {
  NAME_MAXLENGTH: 20,
  CAPACITY: 20,
  PADDING: '15px',
  MARGIN_BOTTOM: 20,
  FONT_SIZE: 30,
  BORDER: '2px solid lightslategrey',
  BORDER_RADIUS: 8,
  BACKGROUND_COLOR: 'rgba(10,10,10,0.1)',
  BOX_SHADOW: '',
  COLOR: 'gray',
  CURSOR: 'not-allowed',
  ENTERABLE: {
    BACKGROUND_COLOR: 'rgba(255,255,255,0.5)',
    BOX_SHADOW: '3px 3px 0px dimgrey',
    COLOR: 'black',
    CURSOR: 'pointer',
  },
};

const CREATE_ROOM_BUTTON = {
  MARGIN_BOTTOM: 20,
  PADDING: '15px',
  BORDER: '2px dashed lightslategrey',
  BORDER_RADIUS: 8,
  BACKGROUND_COLOR: 'rgba(255,255,255,0.2)',
  CLICKED_EFFECT: '0 2px 10px 0 rgba(150, 150, 150, 0.4) inset',
};

const BUTTON_EFFECT = {
  HOVER: ':hover { background-image: linear-gradient(-180deg, rgba(150, 150, 150, 0.1), rgba(150, 150, 150, 0.2) 50%); }',
  ACTIVE: ':active { box-shadow: none; color: gray; }',
};

export {
  LOBBY, NICKNAME, LOGIN_BUTTON, HEADER, BODY,
  ROOM_INFO, CREATE_ROOM_BUTTON, BUTTON_EFFECT,
};
