const express = require('express');
const { Blog, User } = require('../models');
const tokenExtractor = require('../middlewares/tokenExtractor');

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

router.get('/:id', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Blog,
          as: 'readings',
          through: {
            attributes: [],
          },
        },
      ],
      where: { id: req.params.id },
    });
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
module.exports = router;
