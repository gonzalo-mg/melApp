const {
  userCredentialsSchemaSwagger,
} = require("./dataValidationSchemas/userCredentialsSchema");

const swaggerAutogen = require("swagger-autogen")();
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
      description: "User management tasks",
    },
  ],
  "@definitions": {
    userCredentialsSchema: userCredentialsSchemaSwagger,
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server");
});
