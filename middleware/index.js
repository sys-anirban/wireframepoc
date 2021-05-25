const express = require('express');
const cors = require('cors');
// const multer = require('multer');
// const path = require('path');

const { errorMiddleware } = require('./error');

const userRouter = require('../route/user');

const app = express();

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

app.use(cors());

app.use(cors());

require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// app.use(multer({ storage: fileStorage, fileFilter }).single('image'));
// app.use('/images', express.static(path.join(__dirname, 'images')));

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

module.exports = app;
