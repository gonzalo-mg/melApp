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
    description: 'Sent harvests array to client.',
  }
*/
  try {
    const userEmail = req.header.userEmail;
    const { id } = req.params;
    const harvest = await selectHarvestById(userEmail);

    res.status(200).send({ harvests });
  } catch (error) {
    next(error);
  }
}

module.exports = getHarvestById;
