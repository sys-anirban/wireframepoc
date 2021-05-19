const { validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
  const { username, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      } else if (user.password !== password) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          username: user.username,
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token, isUserAuthenticated: true });
    })
    .catch((error) => {
      next(error);
    });
};
module.exports = { login };
