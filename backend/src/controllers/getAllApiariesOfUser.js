const selectAllApiariesOfUserByEmail = require("../repositories/selectAllApiariesOfUserByEmail");

async function getAllApiariesOfUser(req, res, next) {
  /**
  #swagger.tags = ['Apiaries']
  #swagger.description = 'Get all apiaries of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.responses[200] = {
    description: 'Sent apiaries (array of objects) to client.',
  }
*/
  try {
    const apiaries = await selectAllApiariesOfUserByEmail(req.userEmail);

    res.status(200).send({
      message: "Apiaries recovered as array of objects available in payload.",
      payload: apiaries,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getAllApiariesOfUser;
