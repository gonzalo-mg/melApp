function errorHandler(error, req, res, next) {
  console.error(error);

  // caso de error de validacion de formatos con joi
  if (error.name === "ValidationError") {
    error.statusCode = 400;
  }

  res.status(error.statusCode || 500).send({ message: error.message });
}

module.exports = errorHandler;
