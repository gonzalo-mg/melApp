const selectAllHarvestsOfUserByEmail = require("../repositories/selectAllHarvestsOfUserByEmail");

async function getAllHarvestsOfUser(req, res, next) {
  /**
  #swagger.tags = ['Harvests']
  #swagger.description = 'Get all harvests of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.responses[200] = {
    description: 'Sent harvests (array of objects) to client.',
  }
*/
  try {
    const harvests = await selectAllHarvestsOfUserByEmail(req.userEmail);

    res.status(200).send(harvests);
  } catch (error) {
    next(error);
  }
}

module.exports = getAllHarvestsOfUser;
