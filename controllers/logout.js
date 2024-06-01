const express = require('express');
const jwt = require('jsonwebtoken');
const { ActiveSession } = require('../models');
const tokenExtractor = require('../middlewares/tokenExtractor');

const router = express.Router();

router.delete('/', tokenExtractor, async (req, res, next) => {
  try {
    console.log('pöö');
    await ActiveSession.destroy({
      where: { userId: req.decodedToken.id },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
