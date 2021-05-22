const { Router } = require('express');
const { body } = require('express-validator');
const { login } = require('../controller/user');
const { userdetails } = require('../controller/userdetails');
const router = Router();

router.post(
  '/login',
  [
    body('emailid').isEmail().withMessage('Please enter a Valid email'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('minimum eight character & maximum 20 character long'),
  ],
  login
);
router.get('/userdetails', userdetails);

module.exports = router;
