export const setSize = (constants) => `
  width: ${constants.WIDTH || constants.getWidth()}px;
  height: ${constants.HEIGHT || constants.getHeight()}px;
`;

export const setPercentSize = (constants) => `
  width: ${constants.PERCENT_WIDTH}%;
  height: ${constants.PERCENT_HEIGHT}%;
`;

export const setFlex = (direction, justifyContent = '') => `
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justifyContent};
`;

export const setBorderAndRadius = (constants) => `
  border: ${constants.BORDER};
  border-radius: ${constants.BORDER_RADIUS}px;
`;
