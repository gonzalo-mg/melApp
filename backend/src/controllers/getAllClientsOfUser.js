const { message } = require("../dataValidationSchemas/idNum");
const selectAllClientsOfUserByEmail = require("../repositories/selectAllClientsOfUserByEmail");

async function getAllClientsOfUser(req, res, next) {
  /**
  #swagger.tags = ['Clients']
  #swagger.description = 'Get all clients of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.responses[200] = {
    description: 'Clients recovered as array of objects available in payload.',
    schema: { $ref: "#/definitions/response200" }
  }
*/
  try {
    const clients = await selectAllClientsOfUserByEmail(req.userEmail);

    res.status(200).send({
      message: "Clients recovered as array of objects available in payload.",
      payload: clients,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getAllClientsOfUser;
