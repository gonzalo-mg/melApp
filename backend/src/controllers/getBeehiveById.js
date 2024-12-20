const numericalId = require("../dataValidationSchemas/numericalIdSchema");
const selectBeehiveById = require("../repositories/selectBeehiveById");

async function getBeehiveById(req, res, next) {
  /**
  #swagger.tags = ['Beehives']
  #swagger.description = 'Get a particualar beehive of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.responses[200] = {
    description: 'Beehive recovered as object available in payload.',
    schema: { $ref: "#/definitions/response200" }
  }
  #swagger.responses[400] = {
    $ref: "#/schemas/validationErrorResponse"
  }
*/
  try {
    //validar q el id es de naturaleza numerica
    await numericalId.validateAsync(req.params.beehiveId);

    const [beehive] = await selectBeehiveById(
      req.params.beehiveId,
      req.userEmail
    );

    return res.status(200).send({
      message: "Beehive recovered as object available in payload.",
      payload: beehive,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getBeehiveById;
