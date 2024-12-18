const Joi = require("joi");
const j2s = require("joi-to-swagger");

const response200Schema = Joi.object({
  message: Joi.string().required(),
  payload: Joi.object({}),
});

const { swagger: response200SchemaSwagger } = j2s(loginUser200ResponseSchema);

module.exports = { response200Schema, response200SchemaSwagger: response200SchemaSwagger };