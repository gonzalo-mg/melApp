const idNumSchema = require("../dataValidationSchemas/idNum");
const selectClientById = require("../repositories/selectClientById");

async function getClientById(req, res, next) {
  /**
  #swagger.tags = ['Clients']
  #swagger.description = 'Get client of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.parameters['clientId] = {
    in: 'path',                                           
    required: 'true'
  }

  #swagger.responses[200] = {
    description: 'Sent client (object) to client.',
  }
  #swagger.responses[400] = {
    $ref: "#/definitions/validationErrorResponse"
  }  
*/
  try {
    //validar q el id es de naturaleza numerica
    await idNumSchema.validateAsync(parseInt(req.params.clientId, 10))

    const [client] = await selectClientById(req.params.clientId, req.userEmail);
    
    res.status(200).send(client);
  } catch (error) {
    next(error);
  }
}

module.exports = getClientById;
