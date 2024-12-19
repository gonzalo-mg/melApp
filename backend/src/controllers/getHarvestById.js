const idNumSchema = require("../dataValidationSchemas/idNum");
const selectHarvestById = require("../repositories/selectHarvestById");

async function getHarvestById(req, res, next) {
  /**
  #swagger.tags = ['Harvests']
  #swagger.description = 'Get a particualar harvest of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.responses[200] = {
    description: 'Harvest recovered as object available in payload.',
    schema: { $ref: "#/definitions/response200" }
  }
  #swagger.responses[400] = {
    $ref: "#/schemas/validationErrorResponse"
  }
*/
  try {
    //validar q el id es de naturaleza numerica
    await idNumSchema.validateAsync(req.params.apiaryId);

    const [harvest] = await selectHarvestById(
      req.params.harvestId,
      req.userEmail
    );

    return res.status(200).send({
      message: "Harvest recovered as object available in payload.",
      payload: harvest,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getHarvestById;
