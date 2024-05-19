import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { SECRET } from '../util/config.js';

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

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

export default router;
