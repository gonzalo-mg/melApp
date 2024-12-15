const Joi = require("joi");
const j2s = require("joi-to-swagger");

const errorSchema = Joi.object({
  message: Joi.string().required(),
  statusCode: Joi.number().required(),
});

const { swagger: errorSchemaSwagger } = j2s(errorSchema);

module.exports = { errorSchema, errorSchemaSwagger };
