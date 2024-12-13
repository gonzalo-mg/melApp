const swaggerAutogen = require('swagger-autogen')();
require("dotenv").config();
const { PORT } = process.env;
console.log(PORT)

const doc = {
    info: {
        title: 'API backend melApp',
        description: 'Documentación de la API para melApp',
    },
    host: `localhost:${PORT}`,
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./server');
});