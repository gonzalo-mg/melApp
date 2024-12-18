const idNumSchema = require("../dataValidationSchemas/idNum");
const selectSupplierById = require("../repositories/selectSupplierById");

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
*/
  try {
    //validar q el id es de naturaleza numerica
    await idNumSchema.validateAsync(req.params.apiaryId);

    const [supplier] = await selectSupplierById(
      req.params.supplierId,
      req.userEmail
    );

    res.status(200).send({
      message: "Supplier recovered as object available in payload.",
      payload: supplier,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getSupplierById;
