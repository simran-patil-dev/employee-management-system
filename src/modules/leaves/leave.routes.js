const express = require('express');
const router = express.Router();

const controller = require('./leave.controller');
const authMiddleware = require('../../shared/middleware/authMiddleware');
const roleGuard = require('../../shared/middleware/roleGuard');



/**
 * @swagger
 * tags:
 *   name: Leaves
 *   description: Leave management
 */

/**
 * @swagger
 * /leaves:
 *   post:
 *     summary: Apply for leave
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fromDate
 *               - toDate
 *               - reason
 *             properties:
 *               fromDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-04-25
 *               toDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-04-28
 *               reason:
 *                 type: string
 *                 example: Medical leave
 *     responses:
 *       201:
 *         description: Leave applied
 */
router.post('/', authMiddleware, roleGuard(['EMPLOYEE']), controller.applyLeave);



/**
 * @swagger
 * /leaves:
 *   get:
 *     summary: Get all leaves
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of leaves
 */
router.get('/', authMiddleware, roleGuard(['HR', 'ADMIN']), controller.getAllLeaves);


/**
 * @swagger
 * /leaves/{id}/status:
 *   patch:
 *     summary: Update leave status
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Status updated
 */
router.patch('/:id/status', authMiddleware, roleGuard(['HR', 'ADMIN']), controller.updateStatus);

/**
 * @swagger
 * /leaves/my:
 *   get:
 *     summary: Get my leaves
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: My leave records
 */
router.get('/my', authMiddleware, roleGuard(['EMPLOYEE']), controller.getMyLeaves); // ✅ add this


module.exports = router;