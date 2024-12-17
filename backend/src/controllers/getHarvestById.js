const idNumSchema = require("../dataValidationSchemas/idNum");
const selectHarvestById = require("../repositories/selectHarvestById");

async function getHarvestById(req, res, next) {
  /**
  #swagger.tags = ['Harvests']
  #swagger.description = 'Get a particualar harvest of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.parameters['$ref'] = ["#/components/parameters/userEmailHeader"]

  #swagger.parameters['harvestId] = {
    in: 'path',                            
    description: 'id',                   
    required: 'true'
  }

  #swagger.responses[200] = {
    description: 'Sent harvest (object) to client.',
  }
*/
  try {
    //validar q el id es de naturaleza numerica
    await idNumSchema.validateAsync(parseInt(req.params.harvestId, 10))

    const [harvest] = await selectHarvestById(req.params.harvestId, req.headers.useremail);
    
    res.status(200).send(harvest);
  } catch (error) {
    next(error);
  }
}

module.exports = getHarvestById;
