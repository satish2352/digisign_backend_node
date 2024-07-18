const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path'); // Import the path module

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Digisign API Documentation',
      version: '1.0.0',
      description: 'Documentation for your REST API',
    },
    servers: [
      {
        url: 'http://localhost:8001', // Replace with your server URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your API routes
  //apis: [path.join(__dirname, '*.js'), path.join(__dirname, '**/*.js')], // Include all JS files in the docs directory and subdirectories

  //apis: [path.join(__dirname, './docs/**/*.js')], // Include all JS files in the docs directory and subdirectories

};

const specs = swaggerJsdoc(options);

module.exports = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
