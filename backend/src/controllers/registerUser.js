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
  #swagger.description = 'Register a new user..'
  #swagger.requestBody = {
    description: 'Request body containing the dedired users email and password (encrypted).',
    schema: { $ref: "#/definitions/userCredentialsSchema" }  
  }
  #swagger.responses[201] = {
    description: 'User registered succesfully; sent user credentials to client.',
    schema: { $ref: "#/definitions/loginUser200ResponseSchema" }
  }
  #swagger.responses[400] = {
    description: 'Registration failed: body does not match data schema.',
    schema: { $ref: "#/definitions/errorSchema" }
  } 
  #swagger.responses[409] = {
    description: 'Registration failed: the email is already registered.',
    schema: { $ref: "#/definitions/errorSchema" }
  } 
*/
  try {
    // validar formato datos peticion
    await userCredentialsSchema.validateAsync(req.body);

    const { email, password } = req.body;

    // si ya esta registrado lanzar error
    if (await selectUserByEmail(email)) {
      createHttpError("The email is already registered", 409);
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
