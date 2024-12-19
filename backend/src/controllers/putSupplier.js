const { supplierSchema } = require("../dataValidationSchemas/supplierSchema");
const updateSupplier = require("../repositories/updateSupplier");
const selectSupplierByName = require("../repositories/selectSupplierByName");

async function putSupplier(req, res, next) {
  /**
  #swagger.tags = ['Suppliers']
  #swagger.description = 'Edit a supplier of current user, identifed by its idSupplier.'

  #swagger.security = [{
    "bearerAuth": []
  }]

  #swagger.requestBody = {
    description: 'Information needed to edit supplier.',
    schema: { $ref: "#/definitions/supplier" } 
  }
  #swagger.responses[200] = {
    description: 'Supplier edited successfully.',
    schema: { $ref: "#/definitions/response200" }
  }
  #swagger.responses[400] = {
    $ref: "#/schemas/validationErrorResponse"
  }
  #swagger.responses[404] = {
    description: 'Not edited: no supplier with that id exists for this user.'
  }
*/
  try {
    await supplierSchema.validateAsync(req.body);

    const [exists] = await selectSupplierById(
      req.body.supplierId,
      req.userEmail
    );

    if (!exists) {
      return res.status(404).send({
        message: "Not edited: no supplier with that id exists for this user.",
        payload: null,
      });
    }

    await updateSupplier(req.body, req.userEmail);

    const [editedSupplier] = await selectSupplierByName(
      req.body.supplierName,
      req.userEmail
    );

    return res.status(200).send({
      message: "Supplier edited successfully.",
      payload: editedSupplier,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = putSupplier;
