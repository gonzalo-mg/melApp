const Joi = require("joi");
const j2s = require("joi-to-swagger");

const supplierSchema = Joi.object({
  supplierId: Joi.number().integer(),
  supplierName: Joi.string().max(100).required(),
  phone: Joi.string().max(15),
  email: Joi.string().email().max(100),
  web: Joi.string().max(100),
  locality: Joi.string().max(100),
  street: Joi.string().max(100),
  addressNumber: Joi.number().integer(),
  notes: Joi.string().max(500),
  // userEmail is injected by controllers, obtained from jwt token; so client request should not manually set the user
  //userEmail: Joi.string().email().max(100),
  created: Joi.date()
});

const { swagger: supplierSchemaSwagger } = j2s(supplierSchema);

module.exports = { supplierSchema, supplierSchemaSwagger };
