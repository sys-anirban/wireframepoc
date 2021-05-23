const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamMembersSchema = new Schema({
  emailid: {
    type: String,
    required: true,
  },
  teammembers: {
    type: Array,
    required: true,
  },
});
module.exports = mongoose.model('teammembers', teamMembersSchema);
