const { required } = require("joi");
const { errorSchemaSwagger } = require("./dataValidationSchemas/errorSchema");
const {
  loginUser200ResponseSchemaSwagger,
} = require("./dataValidationSchemas/loginUser200ResponseSchema");
const {
  userCredentialsSchemaSwagger,
} = require("./dataValidationSchemas/userCredentialsSchema");

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
      name: "Harvests",
      description:
        "Harvests management tasks; users only have access to their own harvests; harvests record the state of the beehive and apiary at the actual moment of harvesting, and do not reflect changes suffered afterwards.",
    },
  ],
  "@definitions": {
    userCredentialsSchema: userCredentialsSchemaSwagger,
    loginUser200ResponseSchema: loginUser200ResponseSchemaSwagger,
    errorSchema: errorSchemaSwagger,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        description: "JWT token",
        scheme: "bearer",
        bearerFormat: "JWT",
        required: "true",
      },
    },
    parameters: {
      userEmailHeader: {
        in: "header",
        name: "userEmail",
        description: "Current user email",
        schema: { type: "string" },
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
