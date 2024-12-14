const swaggerAutogen = require('swagger-autogen')();
require("dotenv").config();
const { PORT } = process.env;

const doc = {
    info: {
        title: 'API backend melApp',
        description: 'Documentación de la API backend para melApp',
    },
    host: `localhost:${PORT}`,
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server');
});