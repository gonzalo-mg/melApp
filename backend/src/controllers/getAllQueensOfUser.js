const selectAllQueensOfUserByEmail = require("../repositories/selectAllQueensOfUserByEmail");

async function getAllQueensOfUser(req, res, next) {
  /**
  #swagger.tags = ['Queens']
  #swagger.description = 'Get all queens of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.responses[200] = {
    description: 'Sent queens (array of objects) to client.',
  }
*/
  try {
    const queens = await selectAllQueensOfUserByEmail(req.userEmail);

    res.status(200).send(queens);
  } catch (error) {
    next(error);
  }
}

module.exports = getAllQueensOfUser;
