const { validationResult } = require('express-validator');
const User = require('../models/user');
const UserdetailsSchema = require('../models/userdetails');
const OfficialdetailsSchema = require('../models/officialdetails');
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
const userdetails = async (req, res, next) => {
  try {
    const { emailid } = req.query;
    const userdetail = await UserdetailsSchema.findOne({
      emailid,
    });
    if (!userdetail) {
      ProblemError(errorDescription.FETCH_FAILED, 422);
    }
    res.status(200).json({ userdetail });
  } catch (error) {
    next(error);
  }
};

const officialdetails = async (req, res, next) => {
  try {
    const { emailid } = req.query;
    const officialdetail = await OfficialdetailsSchema.findOne({
      emailid,
    });
    if (!officialdetail) {
      ProblemError(errorDescription.FETCH_FAILED, 422);
    }
    res.status(200).json({ officialdetail });
  } catch (error) {
    next(error);
  }
};

const updateskillset = async (req, res, next) => {
  try {
    const { emailid } = req.query;

    const { skilltype, updatedSkills } = req.body;

    const queryString =
      skilltype === 'pskill'
        ? { pskill: updatedSkills }
        : { sskill: updatedSkills };

    const officialdetail = await OfficialdetailsSchema.findOneAndUpdate(
      { emailid: 'adminex@admin.com' },
      { ...queryString },
      { new: true }
    );
    if (!officialdetail) {
      ProblemError(errorDescription.UPDATE_FAILED, 422);
    }
    res.status(200).json({ officialdetail });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, userdetails, officialdetails, updateskillset };
