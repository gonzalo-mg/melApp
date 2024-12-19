const selectAllHarvestsOfUserByEmail = require("../repositories/selectAllHarvestsOfUserByEmail");

async function getAllHarvestsOfUser(req, res, next) {
  /**
  #swagger.tags = ['Harvests']
  #swagger.description = 'Get all harvests of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.responses[200] = {
    description: 'Harvests recovered as array of objects available in payload.',
    schema: { $ref: "#/definitions/response200" }
  }
*/
  try {
    const harvests = await selectAllHarvestsOfUserByEmail(req.userEmail);

    return res.status(200).send({
      message: "Harvests recovered as array of objects available in payload.",
      payload: harvests,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getAllHarvestsOfUser;
