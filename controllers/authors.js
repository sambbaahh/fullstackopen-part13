const express = require('express');
const { Sequelize } = require('sequelize');
const { Blog } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await Blog.findAll({
      group: 'author',
      attributes: [
        'author',
        [Sequelize.fn('SUM', Sequelize.col('likes')), 'likes'],
        [Sequelize.fn('COUNT', Sequelize.col('title')), 'articles'],
      ],
      order: [['likes', 'DESC']],
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
