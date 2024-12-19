const Joi = require("joi");
const j2s = require("joi-to-swagger");

const clientSchema = Joi.object({
  clientId: Joi.number().integer(),
  clientName: Joi.string().max(100).required(),
  requiredServices: Joi.string().valid('Products', 'Polinization'),
  phone: Joi.string().max(15),
  email: Joi.string().email().max(100),
  locality: Joi.string().max(100),
  street: Joi.string().max(100),
  addressNumber: Joi.number().integer(),
  notes: Joi.string().max(500),
  // userEmail is injected by controllers, obtained from jwt token; so client request should not manually set the user
  //userEmail: Joi.string().email().max(100),
  created: Joi.date()
});

const { swagger: clientSchemaSwagger } = j2s(clientSchema);

module.exports = { clientSchema, clientSchemaSwagger };
