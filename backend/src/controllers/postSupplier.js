const { supplierSchema } = require("../dataValidationSchemas/supplierSchema");
const insertSupplier = require("../repositories/insertSupplier");
const selectSupplierByName = require("../repositories/selectSupplierByName");

async function postSupplier(req, res, next) {
  /**
  #swagger.tags = ['Suppliers']
  #swagger.description = 'Create new supplier for current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]

  #swagger.requestBody = {
    description: 'Information needed to create new supplier. Only supplierName is required.',
    schema: { $ref: "#/definitions/supplier" } 
  }
  #swagger.responses[201] = {
    description: 'Supplier created successfully.',
    schema: { $ref: "#/definitions/response200" }
  }
  #swagger.responses[400] = {
    $ref: "#/schemas/validationErrorResponse"
  }
  #swagger.responses[409] = {
    description: 'Not created: a supplier with that name already exists for this user.'
  }
*/
  try {
    await supplierSchema.validateAsync(req.body);

    const [exists] = await selectSupplierByName(
      req.body.supplierName,
      req.userEmail
    );

    if (exists) {
      res.status(409).send({
        message:
          "Not created: a supplier with that name already exists for this user.",
        payload: exists,
      });
    }

    await insertSupplier(req.body, req.userEmail);

    const [newSupplier] = await selectSupplierByName(
      req.body.supplierName,
      req.userEmail
    );

    res.status(201).send({
      message: "Supplier created successfully.",
      payload: newSupplier,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = postSupplier;
