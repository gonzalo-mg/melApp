const selectAllBeehivesOfUserByEmail = require("../repositories/selectAllBeehivesOfUserByEmail");

async function getAllBeehivesOfUser(req, res, next) {
  /**
  #swagger.tags = ['Beehives']
  #swagger.description = 'Get all beehives of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.responses[200] = {
    description: 'Beehives recovered as array of objects available in payload.',
    schema: { $ref: "#/definitions/response200" }
  }
*/
  try {
    const beehives = await selectAllBeehivesOfUserByEmail(req.userEmail);

    return res.status(200).send({
      message: "Beehives recovered as array of objects available in payload.",
      payload: beehives,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getAllBeehivesOfUser;
