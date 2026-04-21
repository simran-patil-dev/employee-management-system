const express = require('express');
const router = express.Router();

const controller = require('./leave.controller');
const authMiddleware = require('../../shared/middleware/authMiddleware');
const roleGuard = require('../../shared/middleware/roleGuard');

router.post('/', authMiddleware, roleGuard(['EMPLOYEE']), controller.applyLeave);

router.get('/', authMiddleware, roleGuard(['HR', 'ADMIN']), controller.getAllLeaves);

router.patch('/:id/status', authMiddleware, roleGuard(['HR', 'ADMIN']), controller.updateStatus);
router.get('/my', authMiddleware, roleGuard(['EMPLOYEE']), controller.getMyLeaves); // ✅ add this


module.exports = router;