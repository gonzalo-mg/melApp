const Joi = require("joi");

const idNumSchema =  Joi.number().integer().positive().required();

module.exports = idNumSchema;