const { validationResult } = require('express-validator');
const User = require('../models/User');

const login = (req, res, next) => {
  const { username, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(422)
      .json({ message: 'Validation Failed', data: errors.array() });
  }
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        res.status(422).json({ message: 'no user with this id' });
      }
      if (user.password === password) {
        res.status(200).json({ message: 'Came here', isLoggedin: true });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Something went wrong' });
    });
};
module.exports = { login };
