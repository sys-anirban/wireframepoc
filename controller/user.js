const { validationResult } = require('express-validator');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { ProblemError } = require('../middleware/error');
const errorDescription = require('../constants/errors');

const login = async (req, res, next) => {
  try {
    const { emailid, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      ProblemError(errorDescription.VALIDATION_ERROR, 422, { isInvalid: true });
    }
    const user = await User.findOne({ emailid });
    if (!user) {
      ProblemError(errorDescription.USER_NOT_FOUND, 401, { isInvalid: true });
    } else if (user.password !== password) {
      ProblemError(errorDescription.INVALID_CREDENTIALS, 401, {
        isInvalid: true,
      });
    }
    const token = jwt.sign(
      {
        emailid: user.emailid,
      },
      'token',
      { expiresIn: '1h' }
    );
    res
      .status(200)
      .json({ token, isUserAuthenticated: true, emailid: user.emailid });
  } catch (error) {
    next(error);
  }
};
module.exports = { login };
