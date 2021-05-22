const Userdetails = require('../models/userdetails');

const userdetails = async (req, res, next) => {
  try {
    const { emailid } = req.headers;
    const userdetail = await Userdetails.findOne({
      emailid,
    });
    if (!userdetail) {
      return res.status(200).json({ message: 'no user found with this email' });
    }
    res.status(200).json({ userdetail });
  } catch (error) {
    next(error);
  }
};
module.exports = { userdetails };
