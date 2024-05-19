import jwt from 'jsonwebtoken';
import { SECRET } from '../util/config.js';

const tokenExtractor = (req, res, next) => {
  try {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } else {
      const error = new Error('Token missing');
      error.code = 401;
      return next(error);
    }
  } catch (error) {
    const jwtError = new Error('Token invalid');
    jwtError.code = 401;
    return next(jwtError);
  }
  next();
};

export default tokenExtractor;
