const selectAllQueensOfUserByEmail = require("../repositories/selectAllQueensOfUserByEmail");

async function getAllQueensOfUser(req, res, next) {
  /**
  #swagger.tags = ['Queens']
  #swagger.description = 'Get all queens of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.responses[200] = {
    description: 'Queens recovered as array of objects available in payload.',
    schema: { $ref: "#/definitions/response200" }
  }
*/
  try {
    const queens = await selectAllQueensOfUserByEmail(req.userEmail);

    res.status(200).send({
      message: "Queens recovered as array of objects available in payload.",
      payload: queens,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getAllQueensOfUser;
