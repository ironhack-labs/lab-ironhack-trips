const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = Schema({
  username: String,
  password: String,
  pic_name: String,
  facebookID: String,
  facebookName: String
},{
   timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
 });

const User = mongoose.model('User', userSchema);

module.exports = User;
