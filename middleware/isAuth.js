const jwt = require('jsonwebtoken');
const { ProblemError } = require('../middleware/error');
const errorDescription = require('../constants/errors');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    ProblemError(errorDescription.NO_AUTH_HEADER, 401);
  }
  const token = authHeader.split(' ')[1];
  let decodeToken;
  try {
    decodeToken = jwt.verify(token, 'token');
  } catch {
    ProblemError(errorDescription.FAILED_DECODE_TOKEN, 500);
  }
  if (!decodeToken) {
    ProblemError(errorDescription.UNAUTHORISED_ACCESS, 500);
  }
  req.userId = decodeToken.userId;
  next();
};
