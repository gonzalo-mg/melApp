const { numericalId } = require("../dataValidationSchemas/numericalIdSchema");
const selectClientById = require("../repositories/selectClientById");
const createHttpError = require("../utilities/createHttpError");

async function getClientById(req, res, next) {
  /**
  #swagger.tags = ['Clients']
  #swagger.description = 'Get client of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]

  #swagger.responses[200] = {
    description: 'Client recovered as object available in payload.',
    schema: { $ref: "#/definitions/response200" }
  }
  #swagger.responses[400] = {
    $ref: "#/schemas/validationErrorResponse"
  }
  #swagger.responses[404] = {
    $ref: "#/schemas/notFoundErrorResponse"
  }  
 */
  try {
    //validar q el id es de naturaleza numerica
    await numericalId.validateAsync(req.params.clientId);

    const [client] = await selectClientById(req.params.clientId, req.userEmail);

    if (!client) {
      createHttpError("clientId not found for current user.", 404);
    }

    return res.status(200).send({
      message: "Client recovered as object available in payload.",
      paylaod: client,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getClientById;
