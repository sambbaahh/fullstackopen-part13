const tokenExtractor = require('../middlewares/tokenExtractor');
const express = require('express');
const { ReadingList, User } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const result = await ReadingList.create(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { read } = req.body;
    const readingList = await ReadingList.findByPk(id);
    const user = await User.findByPk(req.decodedToken.id);

    if (!read) {
      const error = new Error('Invalid request, you have to give read status');
      error.code = 400;
      return next(error);
    }

    if (readingList.userId !== user.id) {
      const error = new Error('Unauthorized');
      error.code = 401;
      return next(error);
    }

    await readingList.update({ read });
    res.json(readingList);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
