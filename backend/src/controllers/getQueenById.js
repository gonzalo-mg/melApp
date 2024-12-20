const numericalSchema = require("../dataValidationSchemas/numericalIdSchema");
const selectQueenById = require("../repositories/selectQueenById");

async function getQueenById(req, res, next) {
  /**
  #swagger.tags = ['Queens']
  #swagger.description = 'Get queen of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]

  #swagger.responses[200] = {
    description: 'Queen recovered as object available in payload.',
    schema: { $ref: "#/definitions/response200" }
  }
  #swagger.responses[400] = {
    $ref: "#/schemas/validationErrorResponse"
  }
*/
  try {
    //validar q el id es de naturaleza numerica
    await numericalSchema.validateAsync(req.params.apiaryId);

    const [queen] = await selectQueenById(req.params.queenId, req.userEmail);

    return res.status(200).send({
      message: "Queen recovered as object available in payload.",
      payload: queen,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getQueenById;
