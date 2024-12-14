const Joi = require("joi");

const userCredentialsSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required()
});

module.exports = userCredentialsSchema;