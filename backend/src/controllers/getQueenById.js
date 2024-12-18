const idNumSchema = require("../dataValidationSchemas/idNum");
const selectQueenById = require("../repositories/selectQueenById");

async function getQueenById(req, res, next) {
  /**
  #swagger.tags = ['Queens']
  #swagger.description = 'Get queen of current user.'

  #swagger.security = [{
    "bearerAuth": []
  }]
    
  #swagger.parameters['queenId] = {
    in: 'path',                                           
    required: 'true'
  }

  #swagger.responses[200] = {
    description: 'Sent queen (object) to client.',
  }
*/
  try {
    //validar q el id es de naturaleza numerica
    await idNumSchema.validateAsync(parseInt(req.params.queenId, 10));

    const [queen] = await selectQueenById(req.params.queenId, req.userEmail);

    res.status(200).send(queen);
  } catch (error) {
    next(error);
  }
}

module.exports = getQueenById;
