const { clientSchema } = require("../dataValidationSchemas/clientSchema");
const insertClient = require("../repositories/insertClient");
const selectClientById = require("../repositories/selectClientById");
const selectClientByName = require("../repositories/selectClientByName");

async function postClient(req, res, next) {
  /**
  #swagger.tags = ['Clients']
  #swagger.description = 'Create new client for current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]

  #swagger.requestBody = {
    description: 'Information needed to create new client. Only clientName is required.',
    schema: { $ref: "#/definitions/client" } 
  }
  #swagger.responses[201] = {
    description: 'Client created successfully.',
    schema: { $ref: "#/definitions/response200" }
  }
  #swagger.responses[400] = {
    $ref: "#/schemas/validationErrorResponse"
  }
  #swagger.responses[409] = {
    description: 'Not created: a client with that name already exists for this user.'
  }
*/
  try {
    await clientSchema.validateAsync(req.body);

    const [existsName] = await selectClientByName(
      req.body.clientName,
      req.userEmail
    );

    if (existsName) {
      return res.status(409).send({
        message:
          "Not created: a client with that name already exists for this user.",
        payload: existsName,
      });
    }

    // recuperar id del nuevo elemento insertado aprovechando la info devuelta por el pool.query, q la ofrece en su propiedad insertId
    const [{ insertId }] = await insertClient(req.body, req.userEmail);
    const [newClient] = await selectClientById(insertId, req.userEmail);

    return res.status(201).send({
      message: "Client created successfully.",
      payload: newClient,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = postClient;
