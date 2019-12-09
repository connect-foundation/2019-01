import jsonwebtoken from 'jsonwebtoken';
import userDb from '../database/user';

const privateKey = process.env.JWT_SECRET_KEY;
const algorithm = process.env.JWT_ALGORITHM;

const isAdmin = async (req, res, next) => {
  try {
    const { jwt } = req.cookies;
    if (jwt === undefined) throw new Error('jwt not found');

    const userInfo = jsonwebtoken.verify(jwt, privateKey, { algorithm });
    if (userInfo === undefined) throw new Error('jwt not verified');

    const githubId = userInfo.id;
    const [user] = await userDb.fetchUser(githubId);
    if (user === undefined) throw new Error('user not existed');
    if (user.is_admin === false) throw new Error('user not authorized');

    next();
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
