const { clientSchema } = require("../dataValidationSchemas/clientSchema");
const updateClient = require("../repositories/updateClient");
const selectClientByName = require("../repositories/selectClientByName");
const selectClientById = require("../repositories/selectClientById");

async function putClient(req, res, next) {
  /**
  #swagger.tags = ['Clients']
  #swagger.description = 'Edit a client of current user, identifed by its clientId.'

  #swagger.security = [{
    "bearerAuth": []
  }]

  #swagger.requestBody = {
    description: 'Information needed to edit client.',
    schema: { $ref: "#/definitions/client" } 
  }
  #swagger.responses[200] = {
    description: 'Client edited successfully.',
    schema: { $ref: "#/definitions/response200" }
  }
  #swagger.responses[400] = {
    $ref: "#/schemas/validationErrorResponse"
  }
  #swagger.responses[404] = {
    description: 'Not edited: no client with that id exists for this user.'
  }
  #swagger.responses[409] = {
    description: 'Not edited: a client with that name already exists for this user.'
  }
*/
  try {
    await clientSchema.validateAsync(req.body);

    const [existsId] = await selectClientById(req.body.clientId, req.userEmail);

    if (!existsId) {
      return res.status(404).send({
        message: "Not edited: no client with that id exists for this user.",
        payload: null,
      });
    }

    const [existsNewName] = await selectClientByName(
      req.body.clientName,
      req.userEmail
    );
    if (existsNewName.clientId != req.body.clientId) {
      return res.status(409).send({
        message:
          "Not edited: a client with that name already exists for this user.",
        payload: existsNewName,
      });
    }

    await updateClient(req.body, req.userEmail);

    const [editedClient] = await selectClientByName(
      req.body.clientName,
      req.userEmail
    );

    return res.status(200).send({
      message: "Client edited successfully.",
      payload: editedClient,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = putClient;
