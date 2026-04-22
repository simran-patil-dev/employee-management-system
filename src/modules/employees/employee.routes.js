const express = require('express');
const router = express.Router();

const controller = require('./employee.controller');
const authMiddleware = require('../../shared/middleware/authMiddleware');
const roleGuard = require('../../shared/middleware/roleGuard');




/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management
 */

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *               - departmentId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Sharma
 *               email:
 *                 type: string
 *                 example: rahul@gmail.com
 *               password:
 *                 type: string
 *                 example: emp123
 *               role:
 *                 type: string
 *                 example: EMPLOYEE
 *               departmentId:
 *                 type: integer
 *                 example: 1
 *               phone:
 *                 type: string
 *                 example: 9876543210
 *               address:
 *                 type: string
 *                 example: Pune, India
 *     responses:
 *       201:
 *         description: Employee created
 */
// CREATE
router.post(
  '/',
  authMiddleware,
  roleGuard(['ADMIN', 'HR']),
  controller.create
);



/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of employees
 */
// GET ALL
router.get(
  '/',
  authMiddleware,
  roleGuard(['ADMIN', 'HR']),
  controller.getAll
);





/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get single employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee data
 */
// GET ONE
router.get(
  '/:id',
  authMiddleware,
  roleGuard(['ADMIN', 'HR', 'EMPLOYEE']),
  controller.getOne
);



/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee updated
 */
// UPDATE
router.put(
  '/:id',
  authMiddleware,
  roleGuard(['ADMIN', 'HR', 'EMPLOYEE']),
  controller.update
);



/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee deleted
 */
// DELETE
router.delete(
  '/:id',
  authMiddleware,
  roleGuard(['ADMIN', 'HR']),
  controller.remove
);



/**
 * @swagger
 * /employees/{id}/salary:
 *   patch:
 *     summary: Update employee salary
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Salary updated
 */
router.patch(
  '/:id/salary',
  authMiddleware,
  roleGuard(['ADMIN']),
  controller.updateSalary
);


module.exports = router;