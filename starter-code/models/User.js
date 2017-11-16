const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  provider_id: Schema.Types.ObjectId,
  provider_name: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;
