const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  facebook_id      : {type: String },
  provider_name   : {type: String ,trim:true }
});


module.exports = mongoose.model('User', userSchema);


