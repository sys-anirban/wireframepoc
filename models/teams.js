const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamMembersSchema = new Schema({
  emailid: {
    type: String,
    required: true,
  },
  teammembers: {
    type: [Object],
    required: true,
  },
});
module.exports = mongoose.model('teammembers', teamMembersSchema);
