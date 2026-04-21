const express = require('express');
const router = express.Router();

const controller = require('./employee.controller');
const authMiddleware = require('../../shared/middleware/authMiddleware');
const roleGuard = require('../../shared/middleware/roleGuard');

// CREATE
router.post(
  '/',
  authMiddleware,
  roleGuard(['ADMIN', 'HR']),
  controller.create
);

// GET ALL
router.get(
  '/',
  authMiddleware,
  roleGuard(['ADMIN', 'HR']),
  controller.getAll
);

// GET ONE
router.get(
  '/:id',
  authMiddleware,
  roleGuard(['ADMIN', 'HR', 'EMPLOYEE']),
  controller.getOne
);

// UPDATE
router.put(
  '/:id',
  authMiddleware,
  roleGuard(['ADMIN', 'HR', 'EMPLOYEE']),
  controller.update
);

// DELETE
router.delete(
  '/:id',
  authMiddleware,
  roleGuard(['ADMIN', 'HR']),
  controller.remove
);

router.patch(
  '/:id/salary',
  authMiddleware,
  roleGuard(['ADMIN']),
  controller.updateSalary
);


module.exports = router;