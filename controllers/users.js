import express from 'express';
import { Blog, User } from '../models/index.js';
import tokenExtractor from '../middlewares/tokenExtractor.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({ include: Blog });
    res.json(users);
  } catch (error) {
    next(error);
  }
});
router.put('/:username', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);

    const { username } = req.params;
    const [numberOfAffectedRows, updatedUser] = await User.update(
      { username },
      {
        where: { id: user.id },
        returning: true,
      }
    );
    if (numberOfAffectedRows === 0) {
      throw new Error('User not found');
    }

    res.json(updatedUser[0]);
  } catch (error) {
    next(error);
  }
});
export default router;
