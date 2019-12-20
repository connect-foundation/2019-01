import express from 'express';
import nicknameDb from '../../database/nickname';
import { isSuccessFul } from '../../util';

const router = express.Router();

router.get('/list', async (req, res, next) => {
  try {
    const adjList = await nicknameDb.fetchAllAdjs();
    res.status(200).send({ result: true, adjList });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { adj } = req.body;
    const queryResult = await nicknameDb.addAdj(adj);
    const result = isSuccessFul(queryResult);
    res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const { id, adj } = req.body;
    const queryResult = await nicknameDb.renameAdj(id, adj);
    const result = isSuccessFul(queryResult);
    res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const { id } = req.body;
    const queryResult = await nicknameDb.deleteAdj(id);
    const result = isSuccessFul(queryResult);
    res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
});

export default router;
