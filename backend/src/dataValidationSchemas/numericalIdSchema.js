const Joi = require("joi");
const j2s = require("joi-to-swagger");

const numericalId = Joi.string().pattern(/^\d+$/).required();

const { swagger: numericalIdSwagger } = j2s(numericalId);

module.exports = { numericalId, numericalIdSwagger };
