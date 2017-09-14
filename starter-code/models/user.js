const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  provider_id: String,
  provider_name: String,
  username: String,
 password: String
}, {
 timestamps: { createdAt: "created_at", updatedAt: "updated_at" }

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
