export const LOBBY = {
  WIDTH: 800,
  HEIGHT: 620,
  PADDING: '20px',
  BACKGROUND_COLOR: 'rgba(255,255,255,0.2)',
  BORDER: '2px solid lightslategrey',
  BORDER_RADIUS: 8,
  FONT_SIZE: 30,
  LOCATE_CENTER: `position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%,-50%);`,
};

export const HEADER = {
  HEIGHT: 60,
  PADDING: '0 25px 0 15px',
};

export const NICKNAME = {
  FONT_SIZE: 40,
};

export const LOGIN_BUTTON = {
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
  SVG: {
    X: 0,
    Y: -0.5,
    W: 11,
    H: 11,
    PATH: {
      COLOR: 'black',
      INDEXES: 'M3 0h5M2 1h7M1 2h2M4 2h3M8 2h2M0 3h3M8 3h3M0 4h2M9 4h2M0 5h2M9 5h2M0 6h2M9 6h2M0 7h3M8 7h3M1 8h1M3 8h1M7 8h3M2 9h1M7 9h2M3 10h1M7 10h1',
    },
  },
};

export const BODY = {
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

export const ROOM_INFO = {
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

export const CREATE_ROOM_BUTTON = {
  MARGIN_BOTTOM: 20,
  PADDING: '15px',
  BORDER: '2px dashed lightslategrey',
  BORDER_RADIUS: 8,
  BACKGROUND_COLOR: 'rgba(255,255,255,0.2)',
  CLICKED_EFFECT: '0 2px 10px 0 rgba(150, 150, 150, 0.4) inset',
};

export const BUTTON_EFFECT = {
  HOVER: ':hover { background-image: linear-gradient(-180deg, rgba(150, 150, 150, 0.1), rgba(150, 150, 150, 0.2) 50%); }',
  ACTIVE: ':active { box-shadow: none; color: gray; stroke: gray; }',
};
