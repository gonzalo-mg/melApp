const idNumSchema = require("../dataValidationSchemas/idNum");
const selectSupplierById = require("../repositories/selectSupplierById");

async function getSupplierById(req, res, next) {
  /**
  #swagger.tags = ['Suppliers']
  #swagger.description = 'Get supplier of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.parameters['supplierId] = {
    in: 'path',                                           
    required: 'true'
  }

  #swagger.responses[200] = {
    description: 'Sent supplier (object) to client.',
  }
*/
  try {
    //validar q el id es de naturaleza numerica
    await idNumSchema.validateAsync(parseInt(req.params.supplierId, 10))

    const [supplier] = await selectSupplierById(req.params.supplierId, req.userEmail);
    
    res.status(200).send(supplier);
  } catch (error) {
    next(error);
  }
}

module.exports = getSupplierById;
