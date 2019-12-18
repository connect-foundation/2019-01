export const setSize = (width, height) => `
  width: ${width}px;
  height: ${height}px;
`;

export const setFlexDirection = (direction) => `
  display: flex;
  flex-direction: ${direction};
`;

export const setBorderAndRadius = (constants) => `
  border: ${constants.BORDER};
  border-radius: ${constants.BORDER_RADIUS}px;
`;
