const express = require('express');
const router = express.Router();

const controller = require('./department.controller');
const authMiddleware = require('../../shared/middleware/authMiddleware');
const roleGuard = require('../../shared/middleware/roleGuard');

router.post(
  '/',
  authMiddleware,
  roleGuard(['ADMIN']),
  controller.create
);

router.get(
  '/',
  authMiddleware,
  roleGuard(['ADMIN', 'HR']),
  controller.getAll
);

module.exports = router;