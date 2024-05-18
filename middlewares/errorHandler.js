const errorHandler = (error, req, res, next) => {
  console.log('Error middleware');
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

export default errorHandler;
