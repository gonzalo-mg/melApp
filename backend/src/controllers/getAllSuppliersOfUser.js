const selectAllSuppliersOfUserByEmail = require("../repositories/selectAllSuppliersOfUserByEmail");

async function getAllSuppliersOfUser(req, res, next) {
  /**
  #swagger.tags = ['Suppliers']
  #swagger.description = 'Get all suppliers of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.responses[200] = {
    description: 'Suppliers recovered as array of objects available in payload.',
    schema: { $ref: "#/definitions/response200" }
  }
*/
  try {
    const suppliers = await selectAllSuppliersOfUserByEmail(req.userEmail);

    res.status(200).send({
      message: "Suppliers recovered as array of objects available in payload.",
      payload: suppliers,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getAllSuppliersOfUser;
