const Joi = require("joi");
const j2s = require("joi-to-swagger");

const userCredentialsSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required(),
});

const { swagger: userCredentialsSchemaSwagger } = j2s(userCredentialsSchema);

module.exports = { userCredentialsSchema, userCredentialsSchemaSwagger };
