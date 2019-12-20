import jsonwebtoken from 'jsonwebtoken';
import createError from 'http-errors';
import userDb from '../database/user';
import ERROR_MSG from '../constants/error-message';

const privateKey = process.env.JWT_SECRET_KEY;
const algorithm = process.env.JWT_ALGORITHM;

const isAdmin = async (req, res, next) => {
  try {
    const { _jwt } = req.cookies;
    if (_jwt === undefined) throw createError(401, ERROR_MSG.JWT_NOT_FOUND);

    const userInfo = jsonwebtoken.verify(_jwt, privateKey, { algorithm });
    if (userInfo === undefined) throw createError(401, ERROR_MSG.JWT_NOT_VERIFIED);

    const { githubId } = userInfo;
    const [user] = await userDb.fetchUser(githubId);
    if (user === undefined) throw createError(401, ERROR_MSG.USER_NOT_FOUND);
    if (Boolean(user.is_admin) === false) throw createError(403, ERROR_MSG.USER_NOT_AUTHORIZED);

    next();
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
