const { Router } = require('express');
const { body } = require('express-validator');
const { login } = require('../controller/user');
const router = Router();

router.post(
  '/login',
  [
    body('username').isEmail().withMessage('Please enter a Valid email'),
    body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage('minimum eight character long'),
  ],
  login
);

module.exports = router;
