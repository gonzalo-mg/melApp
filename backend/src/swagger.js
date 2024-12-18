const { required } = require("joi");
const { errorSchemaSwagger } = require("./dataValidationSchemas/errorSchema");
const {
  response200SchemaSwagger,
} = require("./dataValidationSchemas/response200Schema");
const {
  userCredentialsSchemaSwagger,
} = require("./dataValidationSchemas/userCredentialsSchema");
const { numericalIdSwagger } = require("./dataValidationSchemas/idNum");
const { supplierSchemaSwagger } = require("./dataValidationSchemas/supplierSchema");

const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
require("dotenv").config();
const { PORT } = process.env;

const doc = {
  info: {
    title: "API backend melApp",
    description: "Documentación de la API backend para melApp",
  },
  host: `localhost:${PORT}`,
  schemes: ["http"],
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    {
      name: "Users",
      description: "User management tasks.",
    },
    {
      name: "Suppliers",
      description:
        "Suppliers management tasks; users only have access to the suppliers they have registered themselves.",
    },
    {
      name: "Clients",
      description:
        "Clients management tasks; users only have access to the clients they have registered themselves.",
    },
    {
      name: "Apiaries",
      description:
        "Apiaries management tasks; users only have access to their own apiaries.",
    },
    {
      name: "Queens",
      description:
        "Queen bees management tasks; users only have access to their own queens.",
    },
    {
      name: "Beehives",
      description:
        "Beehives management tasks; users only have access to their own beehives.",
    },
    {
      name: "Harvests",
      description:
        "Harvests management tasks; users only have access to their own harvests; harvests record the state of the beehive and apiary at the actual moment of harvesting, and do not reflect changes suffered afterwards.",
    },
  ],
  "@definitions": {
    userCredentials: userCredentialsSchemaSwagger,
    response200: response200SchemaSwagger,
    errors: errorSchemaSwagger,
    numericalId: numericalIdSwagger,
    supplier: supplierSchemaSwagger,
  },
  schemas: {
    validationErrorResponse: {
      description:
        "Validation error: request data does not comply with expected data schema.",
    },
  },
  components: {
    parameters: {
      numericalIdParameter: {
        description: 'Identification number',
        in: 'path',                                           
        required: 'true',
        schema: { $ref: "#/definitions/numericalId" },
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        description: "JWT token",
        scheme: "bearer",
        bearerFormat: "JWT",
        required: "true",
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server");
});
