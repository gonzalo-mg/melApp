const idNumSchema = require("../dataValidationSchemas/idNum");
const selectApiaryById = require("../repositories/selectApiaryById");

async function getApiaryById(req, res, next) {
  /**
  #swagger.tags = ['Apiaries']
  #swagger.description = 'Get specific apiary of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.parameters['apiaryId] = {
    in: 'path',                                           
    required: 'true'
  }

  #swagger.responses[200] = {
    description: 'Sent apiary (object) to client.',
  }
*/
  try {
    //validar q el id es de naturaleza numerica
    await idNumSchema.validateAsync(parseInt(req.params.apiaryId, 10))

    const [apiary] = await selectApiaryById(req.params.apiaryId, req.userEmail);
    
    res.status(200).send(apiary);
  } catch (error) {
    next(error);
  }
}

module.exports = getApiaryById;
