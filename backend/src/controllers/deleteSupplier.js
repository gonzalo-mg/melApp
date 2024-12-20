const deleteSupplierById = require("../repositories/deleteSupplierById");

async function deleteSupplier(supplierId, userEmail) {
  /**
     #swagger.tags = ['Suppliers']
     #swagger.description = 'Delete a supplier of current user.'

    #swagger.security = [{
        "bearerAuth": []
    }]
    
    #swagger.responses[200] = {
        description: 'Supplier deleted.',
        schema: { $ref: "#/definitions/response200" }
    }
    */
  try {
    await deleteSupplierById(, req.userEmail);
  } catch (error) {
    next(error);
  }
}

module.exports = deleteSupplier;
