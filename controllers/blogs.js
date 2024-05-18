import express from 'express';
import { Blog } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const notes = await Blog.findAll();
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Blog.destroy({
      where: {
        id,
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

export default router;
