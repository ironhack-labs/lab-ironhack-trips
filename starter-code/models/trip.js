const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const tripSchema = new Schema({
  user_id      :  { type: Schema.Types.ObjectId, ref: 'User', required: true },
  user_name   : {type: String ,trim:true },
  destination   : {type: String },
  description: {type: String},
  pic_path     : { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250" }
});

module.exports  = mongoose.model('Trip', tripSchema);


