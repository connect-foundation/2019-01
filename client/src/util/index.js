const isFunction = (callback) => typeof callback === 'function';

const changeNumberToTwoDigitString = (number) => number.toString().padStart(2, '0');

export { isFunction, changeNumberToTwoDigitString };
