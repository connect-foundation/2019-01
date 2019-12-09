import uuidv1 from 'uuid/v1';

const isFunction = (callback) => typeof callback === 'function';

const shortUuid = () => uuidv1().slice(0, 8);

const isSuccessFul = (queryResult) => queryResult !== undefined && queryResult.affectedRows > 0;

export { isFunction, shortUuid, isSuccessFul };
