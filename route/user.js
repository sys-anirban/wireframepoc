const { Router } = require('express');
const { body } = require('express-validator');
const {
  login,
  userdetails,
  officialdetails,
  updateskillset,
  teammembers,
  signUpUser,
  verifyOTP,
} = require('../controller/user');

const isAuth = require('../middleware/isAuth');

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
router.get('/userdetails', isAuth, userdetails);
router.get('/officialdetails', isAuth, officialdetails);
router.patch('/updateskill', updateskillset);
router.get('/team', isAuth, teammembers);
router.post('/signup', signUpUser);
router.get('/verifyotp', verifyOTP);

module.exports = router;
