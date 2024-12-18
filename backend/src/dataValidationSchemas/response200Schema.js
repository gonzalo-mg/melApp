const Joi = require("joi");
const j2s = require("joi-to-swagger");

const response200Schema = Joi.object({
  message: Joi.string(),
  payload: Joi.object({}),
});

const { swagger: response200SchemaSwagger } = j2s(response200Schema);

module.exports = { response200Schema, response200SchemaSwagger };