const Joi = require("joi");
const j2s = require("joi-to-swagger");

const loginUser200ResponseSchema = Joi.object({
  message: Joi.string().required(),
  payload: Joi.object({
    userToken: Joi.string().required
  }).required(),
});

const { swagger: loginUser200ResponseSchemaSwagger } = j2s(loginUser200ResponseSchema);

module.exports = { loginUser200ResponseSchema, loginUser200ResponseSchemaSwagger };