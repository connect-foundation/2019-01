import express from 'express';
import nicknameDb from '../../database/nickname';
import { isSuccessFul } from '../../util';

const router = express.Router();

router.get('/list', async (req, res, next) => {
  try {
    const nounList = await nicknameDb.fetchAllNouns();
    res.status(200).send({ result: true, nounList });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { noun } = req.body;
    const queryResult = await nicknameDb.addNoun(noun);
    const result = isSuccessFul(queryResult);
    res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const { id, noun } = req.body;
    const queryResult = await nicknameDb.renameNoun(id, noun);
    const result = isSuccessFul(queryResult);
    res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const { id } = req.body;
    const queryResult = await nicknameDb.deleteNoun(id);
    const result = isSuccessFul(queryResult);
    res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
});

export default router;
