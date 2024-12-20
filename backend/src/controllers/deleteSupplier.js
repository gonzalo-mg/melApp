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
    await idNumSchema.validateAsync(req.params.apiaryId);
    await deleteSupplierById(req.params.supplierId, req.userEmail);
    return resizeBy.status(200).send({
      message: "Supplier deleted",
      payload: null,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = deleteSupplier;
