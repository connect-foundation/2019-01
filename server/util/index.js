import uuidv1 from 'uuid/v1';

/**
 * @param {Function} callback
 *
 * @returns {boolean}
 */
export const isFunction = (callback) => typeof callback === 'function';

/**
 * @returns {string} UUID of length 8
 */
export const shortUuid = () => uuidv1().slice(0, 8);

/**
 * @param {Object} queryResult
 *
 * @returns {boolean}
 */
export const isSuccessFul = (queryResult) => (
  queryResult !== undefined && queryResult.affectedRows > 0
);

/**
 * @returns {Date}
 */
export const getTimeOneDayLater = () => new Date(Date.now() + 24 * 3600 * 1000);
