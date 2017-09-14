const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    facebookID: { type: String },
    name: { type: String }
  }
);

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
