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
    #swagger.responses[404] = {
        description: 'No supplier with that supplierId exists for current user.',
        schema: { $ref: "#/definitions/response200" }
    }
    */
  try {
    await numericalId.validateAsync(req.params.supplierId);

    const [supplier] = await selectSupplierById(
      req.params.supplierId,
      req.userEmail
    );

    if (!supplier) {
      return res
        .status(404)
        .send({
          message: "No supplier with that supplierId exists for current user.",
        });
    }

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
