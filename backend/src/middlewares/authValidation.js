const jwt = require("jsonwebtoken");
const createHttpError = require("../utilities/createHttpError");

const authValidation = (req, res, next) => {
  /**
  #swagger.tags = ['Users']
  #swagger.description = 'Check if request has an authorization header with a valid token; if request is authorized, create userEmail request property to identify the user, and proceed to next controller.'
  
  #swagger.responses[400] = {
    description: 'Authorization header missing; can not proceed without it.'
  }
  #swagger.responses[401] = {
    description: 'Authorization denied: invalid token.'
  } 
*/
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
      createHttpError("Invalid token", 401);
    }

    // crear propiedad de autenticacion en el objeto de peticion para el resto de middlewares y endpoints
    req.userEmail = tokenPayload.userEmail;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authValidation;
