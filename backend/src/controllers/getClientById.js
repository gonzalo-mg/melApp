const idNumSchema = require("../dataValidationSchemas/idNum");
const selectClientById = require("../repositories/selectClientById");

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
*/
  try {
    //validar q el id es de naturaleza numerica
    await idNumSchema.validateAsync(req.params.apiaryId);

    const [client] = await selectClientById(req.params.clientId, req.userEmail);

    return res.status(200).send({
      message: "Client recovered as object available in payload.",
      paylaod: client,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getClientById;
