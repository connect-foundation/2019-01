import express from 'express';
import imageDb from '../../database/image';
import { isSuccessFul } from '../../util';

const router = express.Router();

router.get('/list', async (req, res, next) => {
  try {
    const imageList = await imageDb.fetchAllImages();
    res.status(200).send({ result: true, imageList });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { category, name, url } = req.body;
    const queryResult = await imageDb.add(category, name, url);
    const result = isSuccessFul(queryResult);
    res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const { id, action, value } = req.body;
    const actionUpdateMap = {
      category: imageDb.updateCategory,
      name: imageDb.updateName,
      url: imageDb.updateUrl,
    };
    const updateFunction = actionUpdateMap[action];
    if (updateFunction === undefined) throw new Error('non-exist action');
    const queryResult = await updateFunction(id, value);
    const result = isSuccessFul(queryResult);
    res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const { id } = req.body;
    const queryResult = await imageDb.delete(id);
    const result = isSuccessFul(queryResult);
    res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
});

export default router;
