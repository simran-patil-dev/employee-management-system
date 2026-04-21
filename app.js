const express = require('express');
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/swagger");

const authRoutes = require('./src/modules/auth/auth.routes');
const employeeRoutes = require('./src/modules/employees/employee.routes');
const departmentRoutes = require('./src/modules/departments/department.routes');
const leaveRoutes = require('./src/modules/leaves/leave.routes');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());



// routes
app.use('/auth', authRoutes);
app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);
app.use('/leaves', leaveRoutes);

module.exports = app;
