const {
  userCredentialsSchema,
} = require("../dataValidationSchemas/userCredentialsSchema");
const selectUserByEmail = require("../repositories/selectUserByEmail");
const createHttpError = require("../utilities/createHttpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginUser(req, res, next) {
/**
  #swagger.auto = false
  #swagger.tags = ['Users']
  #swagger.description = 'Processes login requests.'
  #swagger.requestBody = {
    description: 'Must provide email and password (encrypted).',
    schema: { $ref: "#/definitions/userCredentialsSchema" }  
  }
  #swagger.responses[200] = {
    description: 'Login succesfull; sent JWT token to client.',
    schema: { $ref: "#/definitions/response20Schema" }
  }
  #swagger.responses[400] = {
    $ref: "#/definitions/validationErrorResponse"
  }
  #swagger.responses[401] = {
    description: 'Login failed: user and/or password are incorrect or unregistered.',
    schema: { $ref: "#/definitions/errorSchema" }
  } 
*/
  try {
    // validar peticion
    await userCredentialsSchema.validateAsync(req.body);

    // recuperar datos peticion
    const { email, password } = req.body;

    // comprobar si el usuario existe
    const user = await selectUserByEmail(email);
    // comprobar contraseña
    const passwordCheck = await bcrypt.compare(password, user.userPassword);
    // mensaje ambiguo para no dar detalles por seguridad
    if (!user || !passwordCheck) {
      createHttpError(
        "Incorrect password or email. Try again. If the problem continues contact and administrator.",
        401
      );
    }

    // si credenciales ok asignar token
    const tokenPayload = { userEmail: email };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({
      message: "Login succesfull; sent JWT token to client",
      payload: { userToken: `Bearer ${token}` },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = loginUser;
