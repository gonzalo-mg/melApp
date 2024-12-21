const { numericalId } = require("../dataValidationSchemas/numericalIdSchema");
const selectSupplierById = require("../repositories/selectSupplierById");
const createHttpError = require("../utilities/createHttpError");

async function getSupplierById(req, res, next) {
  /**
  #swagger.tags = ['Suppliers']
  #swagger.description = 'Get a specific supplier of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]

  #swagger.responses[200] = {
    description: 'Supplier recovered as object available in payload.',
    schema: { $ref: "#/definitions/response200" }
  }
  #swagger.responses[400] = {
    $ref: "#/schemas/validationErrorResponse"
  }
  #swagger.responses[404] = {
    $ref: "#/schemas/notFoundErrorResponse"
  }
 */
  try {
    //validar q el id es de naturaleza numerica
    await numericalId.validateAsync(req.params.supplierId);

    const [supplier] = await selectSupplierById(
      req.params.supplierId,
      req.userEmail
    );

    if (!supplier) {
      createHttpError("supplierId not found for current user.", 404);
    }

    return res.status(200).send({
      message: "Supplier recovered as object available in payload.",
      payload: supplier,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getSupplierById;
