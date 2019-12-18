import uuidv1 from 'uuid/v1';

export const isFunction = (callback) => typeof callback === 'function';

export const shortUuid = () => uuidv1().slice(0, 8);

export const isSuccessFul = (queryResult) => (
  queryResult !== undefined && queryResult.affectedRows > 0
);

export const getTimeOneDayLater = () => new Date(Date.now() + 24 * 3600 * 1000);
