const express = require('express');
const router = express.Router();

const controller = require('./department.controller');
const authMiddleware = require('../../shared/middleware/authMiddleware');
const roleGuard = require('../../shared/middleware/roleGuard');

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Department management
 */

/**
 * @swagger
 * /departments:
 *   post:
 *     summary: Create department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Department created
 */
router.post(
  '/',
  authMiddleware,
  roleGuard(['ADMIN']),
  controller.create
);


/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Get all departments
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of departments
 */

router.get(
  '/',
  authMiddleware,
  roleGuard(['ADMIN', 'HR']),
  controller.getAll
);

module.exports = router;