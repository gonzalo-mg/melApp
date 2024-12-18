const {
  userCredentialsSchema,
} = require("../dataValidationSchemas/userCredentialsSchema");
const selectUserByEmail = require("../repositories/selectUserByEmail");
const insertUser = require("../repositories/insertUser");
const createHttpError = require("../utilities/createHttpError");
const bcrypt = require("bcrypt");

async function registerUser(req, res, next) {
  /**
  #swagger.tags = ['Users']
  #swagger.description = 'Register a new user.'
  #swagger.requestBody = {
    description: 'Must provide email and password (encrypted).',
    schema: { $ref: "#/definitions/userCredentials" }  
  }
  #swagger.responses[201] = {
    description: 'New user succesfully registered; sent user credentials to client.',
    schema: { $ref: "#/definitions/response200" }
  }
  #swagger.responses[400] = {
    $ref: "#/schemas/validationErrorResponse"
  } 
  #swagger.responses[409] = {
    description: 'Registration failed: email address already registered.',
  } 
*/
  try {
    // validar formato datos peticion
    await userCredentialsSchema.validateAsync(req.body);

    const { email, password } = req.body;

    // si ya esta registrado lanzar error
    if (await selectUserByEmail(email)) {
      createHttpError("Registration failed: email address already registered", 409);
    }

    // encriptar password para la bbdd
    const encryptedPassword = await bcrypt.hash(password, 10);

    // insertar nuevo usuario en la bbdd
    await insertUser(
      email,
      encryptedPassword,
    );

    // seleccionar el recien registrado para devolverlo
    const newUser = await selectUserByEmail(email);

    res.status(201).send({
      message: "New user succesfully registered",
      payload: newUser,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = registerUser;
