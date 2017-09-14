const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    provider_id: { type: String,
                  required: true },

    provider_name: { type: String },

  }
);


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
