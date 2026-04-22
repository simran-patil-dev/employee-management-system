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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sundari Patil
 *               email:
 *                 type: string
 *                 example: sundari@gmail.com
 *               password:
 *                 type: string
 *                 example: hr123
 *               role:
 *                 type: string
 *                 example: HR
 *               departmentId:
 *                 type: string
 *                 example: "2e5af24f-3622-475c-b4ac-99cf4c418dcc"
 *               phone:
 *                 type: string
 *                 example: 9876543211
 *               address:
 *                 type: string
 *                 example: Mumbai, India
 *               position:
 *                 type: string
 *                 example: HR Manager
 *               salary:
 *                 type: number
 *                 example: 50000
 *               joiningDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-04-22
 *     responses:
 *       201:
 *         description: Employee created
 */
router.post('/', authMiddleware, roleGuard(['ADMIN', 'HR']), controller.create);


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
router.get('/', authMiddleware, roleGuard(['ADMIN', 'HR']), controller.getAll);


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
router.get('/:id', authMiddleware, roleGuard(['ADMIN', 'HR', 'EMPLOYEE']), controller.getOne);


/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               departmentId:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated
 */
router.put('/:id', authMiddleware, roleGuard(['ADMIN', 'HR', 'EMPLOYEE']), controller.update);


/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete employee
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
 *         description: Employee deleted
 */
router.delete('/:id', authMiddleware, roleGuard(['ADMIN', 'HR']), controller.remove);


/**
 * @swagger
 * /employees/{id}/salary:
 *   patch:
 *     summary: Update employee salary (ADMIN only)
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               increment:
 *                 type: number
 *                 example: 5000
 *               decrement:
 *                 type: number
 *                 example: 2000
 *               bonus:
 *                 type: number
 *                 example: 3000
 *     responses:
 *       200:
 *         description: Salary updated
 */
router.patch('/:id/salary', authMiddleware, roleGuard(['ADMIN']), controller.updateSalary);

module.exports = router;