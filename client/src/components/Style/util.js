export const setSize = (constants) => `
  width: ${constants.WIDTH}px;
  height: ${constants.HEIGHT}px;
`;

export const setFlexDirection = (direction) => `
  display: flex;
  flex-direction: ${direction};
`;

export const setBorderAndRadius = (constants) => `
  border: ${constants.BORDER};
  border-radius: ${constants.BORDER_RADIUS}px;
`;
