const errorHandler = (error, req, res, next) => {
  console.log('Error middleware');
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  return res.send({ error: [error.message] });
};

module.exports = errorHandler;
