const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const descriptionSchema = new Schema({
  emailid: {
    type: String,
    required: true,
  },
  topics: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('description', descriptionSchema);
