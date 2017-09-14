const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema (
  {
    provider_id: {type: String},
    provider_name: {type: String}
  },

  {timestamps: true}
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
