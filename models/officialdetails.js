const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const officialdetailsSchema = new Schema({
  emailid: {
    type: String,
    //   required: true,
  },
  empcode: {
    type: String,
    //   required: true,
  },
  manager: {
    type: String,
    //   required: true,
  },
  memail: {
    type: String,
    //   required: true,
  },
  pskill: {
    type: String,
  },
  sskill: {
    type: String,
  },
});
module.exports = mongoose.model('officialdetails', officialdetailsSchema);
