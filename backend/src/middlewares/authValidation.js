const jwt = require("jsonwebtoken");
const createHttpError = require("../utilities/createHttpError");

const authValidation = (req, res, next) => {
  try {
    // recuperar header authorization
    const { authorization } = req.headers;

    if (!authorization) {
      createHttpError(
        "Authorization header missing; can not proceed without it",
        400
      );
    }

    // verificar token y su formato ("Bearer xxxxx")
    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      createHttpError("Invalid token format", 401);
    }

    let tokenPayload;
    try {
      tokenPayload = jwt.verify(token, process.env.JWT_SECRET);

    } catch (error) {
      createError("Invalid token", 401);
    }

    // crear propiedad de autenticacion en el objeto de peticion para el resto de middlewares y endpoints; darle los datos del token
    req.auth = tokenPayload;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authValidation;
