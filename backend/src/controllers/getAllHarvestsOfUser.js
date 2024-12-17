const selectAllHarvestsOfUserByEmail = require("../repositories/selectAllHarvestsOfUserByEmail");

async function getAllHarvestsOfUser(req, res, next) {
  /**
  #swagger.tags = ['Harvests']
  #swagger.description = 'Get all harvests of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.parameters['$ref'] = ["#/components/parameters/userEmailHeader"]

  #swagger.responses[200] = {
    description: 'Sent harvests array to client.',
  }
*/
  try {
    let userEmail = "abejamaya@email.com";
    const harvests = await selectAllHarvestsOfUserByEmail(userEmail);

    res.status(200).send({ harvests });
  } catch (error) {
    next(error);
  }
}

module.exports = getAllHarvestsOfUser;
