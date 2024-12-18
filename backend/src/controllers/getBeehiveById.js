const idNumSchema = require("../dataValidationSchemas/idNum");
const selectBeehiveById = require("../repositories/selectBeehiveById");

async function getBeehiveById(req, res, next) {
  /**
  #swagger.tags = ['Beehives']
  #swagger.description = 'Get a particualar beehive of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.parameters['beehiveId] = {
    in: 'path',                                           
    required: 'true'
  }

  #swagger.responses[200] = {
    description: 'Sent beehive (object) to client.',
  }
  #swagger.responses[400] = {
    $ref: "#/definitions/validationErrorResponse"
  }
*/
  try {
    //validar q el id es de naturaleza numerica
    await idNumSchema.validateAsync(parseInt(req.params.beehiveId, 10));

    const [beehive] = await selectBeehiveById(
      req.params.beehiveId,
      req.userEmail
    );

    res.status(200).send(beehive);
  } catch (error) {
    next(error);
  }
}

module.exports = getBeehiveById;
