const express = require('express');
const jwt = require('jsonwebtoken');
const { User, ActiveSession } = require('../models');
const { SECRET } = require('../utils/config');

const router = express.Router();

router.post('/', async (request, response, next) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === 'secret';

  if (!(user && passwordCorrect)) {
    const error = new Error('Invalid username or password');
    error.code = 401;
    return next(error);
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  await ActiveSession.create({ token, userId: user.id });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;
