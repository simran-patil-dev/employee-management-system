const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Employee Management API",
      version: "1.0.0",
      description: "API documentation for Employee Management System",
    },
    servers: [
      {
        url: "https://employee-management-system-is4e.onrender.com",
      },
    ],
    components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
},
  },
  apis: ["./src/modules/**/*.js"], // path to your routes
};

const swaggerSpec = swaggerJsdoc(options);



module.exports = swaggerSpec;


