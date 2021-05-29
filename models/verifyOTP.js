const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VerifyAdminOTPModel = new Schema({
  emailid: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model('verifyotps', VerifyAdminOTPModel);
