const express = require('express');
const cors = require('cors');
const { errorMiddleware } = require('./error');

const userRouter = require('../route/user');

const app = express();

app.use(cors());

require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,PUT,GET,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use('/user', userRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use(errorMiddleware);
// app.use((error, req, res, next) => {
//   const status = error.statusCode || 500;
//   const message = error.message;
//   const data = error.data;
//   res.status(status).json({ message: message, data: data });
// });

module.exports = app;
