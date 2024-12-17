const selectAllClientsOfUserByEmail = require("../repositories/selectAllClientsOfUserByEmail");

async function getAllClientsOfUser(req, res, next) {
  /**
  #swagger.tags = ['Clients']
  #swagger.description = 'Get all clients of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.responses[200] = {
    description: 'Sent clients (array of objects) to client.',
  }
*/
  try {
    const clients = await selectAllClientsOfUserByEmail(req.headers.useremail);

    res.status(200).send(clients);
  } catch (error) {
    next(error);
  }
}

module.exports = getAllClientsOfUser;
