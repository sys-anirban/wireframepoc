const express = require('express');
const cors = require('cors');
// const multer = require('multer');
// const path = require('path');

const { errorMiddleware } = require('./error');

const userRouter = require('../route/user');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,PUT,GET,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});
require('dotenv').config();
app.use('/user', userRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use(errorMiddleware);

module.exports = app;
