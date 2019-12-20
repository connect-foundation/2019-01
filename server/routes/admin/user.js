import express from 'express';
import createError from 'http-errors';
import userDb from '../../database/user';
import { isSuccessFul } from '../../util';
import ERROR_MSG from '../../constants/error-message';

const router = express.Router();

router.get('/list', async (req, res, next) => {
  try {
    const userList = await userDb.fetchAllUsers();
    res.status(200).send({ result: true, userList });
  } catch (error) {
    next(error);
  }
});

router.get('/:githubId', async (req, res, next) => {
  try {
    const { githubId } = req.params;
    const [user] = await userDb.fetchUser(githubId);
    res.status(200).send({ result: true, user });
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const { githubId, action } = req.body;
    const actionUpdateMap = {
      authorize: userDb.authorize,
      deauthorize: userDb.deauthorize,
    };
    const updateFunction = actionUpdateMap[action];
    if (updateFunction === undefined) throw createError(400, ERROR_MSG.NON_EXIST_ACTION);

    const queryResult = await updateFunction(githubId);
    const result = isSuccessFul(queryResult);
    res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const { githubId } = req.body;
    const queryResult = await userDb.delete(githubId);
    const result = isSuccessFul(queryResult);
    res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
});

export default router;
