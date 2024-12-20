const deleteSupplierById = require("../repositories/deleteSupplierById");
const { numericalId } = require("../dataValidationSchemas/numericalIdSchema");

async function deleteSupplier(req, res, next) {
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
    await numericalId.validateAsync(req.params.supplierId);
    await deleteSupplierById(req.params.supplierId, req.userEmail);
    return res.status(200).send({
      message: "Supplier deleted",
      payload: null,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = deleteSupplier;
