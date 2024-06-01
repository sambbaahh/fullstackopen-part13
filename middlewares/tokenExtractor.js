const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
const { ActiveSession, User } = require('../models');

const tokenExtractor = async (req, res, next) => {
  try {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } else {
      const error = new Error('Token missing');
      error.code = 401;
      return next(error);
    }

    const user = await User.findByPk(req.decodedToken.id);
    if (!user || user.disabled) {
      const error = new Error('User not found or disabled');
      error.code = 401;
      return next(error);
    }

    const usersToken = await ActiveSession.findOne({
      where: { token: authorization.substring(7) },
    });

    if (!usersToken || usersToken.token !== authorization.substring(7)) {
      const error = new Error('Token not found or invalid');
      error.code = 401;
      return next(error);
    }
    next();
  } catch (error) {
    const jwtError = new Error('Token invalid');
    jwtError.code = 401;
    return next(jwtError);
  }
};

module.exports = tokenExtractor;
