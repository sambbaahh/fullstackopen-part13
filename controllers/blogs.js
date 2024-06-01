const express = require('express');
const { Op } = require('sequelize');
const { Blog, User } = require('../models');
const tokenExtractor = require('../middlewares/tokenExtractor');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { search } = req.query;
    const where = search
      ? {
          [Op.or]: [
            { title: { [Op.substring]: search } },
            { author: { [Op.substring]: search } },
          ],
        }
      : {};

    console.log(where);

    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: { model: User, attributes: ['id', 'username', 'name'] },
      where,
      order: [['likes', 'DESC']],
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);

    const user = await User.findByPk(req.decodedToken.id);

    if (blog.userId !== user.id) {
      const error = new Error('Unauthorized');
      error.code = 401;
      return next(error);
    }

    await Blog.destroy({
      where: {
        id: blog.id,
      },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { likes } = req.body;
    const { id } = req.params;
    const [numberOfAffectedRows, updatedBlogs] = await Blog.update(
      {
        likes,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );

    if (numberOfAffectedRows === 0) {
      throw new Error('Blog not found');
    }

    res.json(updatedBlogs[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
