const { Router } = require('express');
const { body } = require('express-validator');
const { login } = require('../controller/user');
const router = Router();

router.post(
  '/login',
  [
    body('username')
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('minimum eight character & maximum 20 character long'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('minimum eight character & maximum 20 character long'),
  ],
  login
);

module.exports = router;
