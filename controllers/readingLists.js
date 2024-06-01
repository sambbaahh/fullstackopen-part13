const tokenExtractor = require('../middlewares/tokenExtractor');
const express = require('express');
const { ReadingList } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const result = await ReadingList.create(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
