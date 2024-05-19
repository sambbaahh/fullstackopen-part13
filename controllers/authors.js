import express from 'express';
import { Sequelize } from 'sequelize';
import { Blog } from '../models/index.js';

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

export default router;
