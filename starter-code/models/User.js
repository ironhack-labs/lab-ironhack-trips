const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  familyName: String,
  facebookId:  String,
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
