const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const tripSchema = new Schema({
  user_id       : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  user_name     : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  destination   : { type: String, required: true },
  description   : { type: String, required: true },
  pic_path   : {type : String}
});

module.exports = mongoose.model('Trip', tripSchema);