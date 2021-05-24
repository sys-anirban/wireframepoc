const { Router } = require('express');
const { body } = require('express-validator');
const {
  login,
  userdetails,
  officialdetails,
  updateskillset,
  teammembers,
} = require('../controller/user');
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
router.get('/officialdetails', officialdetails);
router.patch('/updateskill', updateskillset);
router.get('/team', teammembers);

module.exports = router;
