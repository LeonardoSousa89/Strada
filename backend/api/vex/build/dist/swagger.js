"use strict";
const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'My API',
        description: 'Description',
    },
    host: 'localhost:8082',
    schemes: ['http'],
};
const outputFile = './path/swagger-output.json';
const endpointsFiles = ['./index.ts'];
/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);
