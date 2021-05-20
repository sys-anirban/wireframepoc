const ProblemError = (message, statusCode, data = {}) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.data = { ...data };
  throw error;
};

const errorMiddleware = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, errors: data });
};

module.exports = { ProblemError, errorMiddleware };
