const selectAllBeehivesOfUserByEmail = require("../repositories/selectAllBeehivesOfUserByEmail");

async function getAllBeehivesOfUser(req, res, next) {
  /**
  #swagger.tags = ['Beehives']
  #swagger.description = 'Get all beehives of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.responses[200] = {
    description: 'Sent beehives (array of objects) to client.',
  }
*/
  try {
    const beehives = await selectAllBeehivesOfUserByEmail(req.userEmail);

    res.status(200).send(beehives);
  } catch (error) {
    next(error);
  }
}

module.exports = getAllBeehivesOfUser;
