const selectAllSuppliersOfUserByEmail = require("../repositories/selectAllSuppliersOfUserByEmail");

async function getAllSuppliersOfUser(req, res, next) {
  /**
  #swagger.tags = ['Suppliers']
  #swagger.description = 'Get all suppliers of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.parameters['$ref'] = ["#/components/parameters/userEmailHeader"]

  #swagger.responses[200] = {
    description: 'Sent suppliers (array of objects) to client.',
  }
*/
  try {
    const suppliers = await selectAllSuppliersOfUserByEmail(req.headers.useremail);

    res.status(200).send(suppliers);
  } catch (error) {
    next(error);
  }
}

module.exports = getAllSuppliersOfUser;
