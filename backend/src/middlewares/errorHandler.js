function errorHandler(error, req, res, next) {
  if (!error) {
    const message = "Resource not found.";
    console.warn(message);
    return res.status(404).send({ message });
  }

  console.error(error);

  // errores de validacion con joi
  if (error.name === "ValidationError") {
    return res.status(400).send({
      message: error.message,
    });
  }

  res.status(error.statusCode || 500).send({
    message: error.message || "Internal Server Error",
  });
}

module.exports = errorHandler;
