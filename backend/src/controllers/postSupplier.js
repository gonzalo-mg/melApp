const { supplierSchema } = require("../dataValidationSchemas/supplierSchema");
const insertSupplier = require("../repositories/insertSupplier");

async function postSupplier(req, res, next) {
  /**
  #swagger.tags = ['Suppliers']
  #swagger.description = 'Create new supplier for current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]

  #swagger.requestBody = {
    description: 'Must provide required fields.',
    schema: { $ref: "#/definitions/supplier" } 

  #swagger.responses[201] = {
    description: 'Supplier created successfully.',
    schema: { $ref: "#/definitions/response200" }
  }
  #swagger.responses[400] = {
    $ref: "#/schemas/validationErrorResponse"
  }
*/
  try {
    await supplierSchema.validateAsync(req.body);

    const [newSupplier] = await insertSupplier(req.body);

    res.status(201).send({
      message: "Supplier created successfully.",
      payload: newSupplier,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = postSupplier;
