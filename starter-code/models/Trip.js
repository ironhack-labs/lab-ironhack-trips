const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tripSchema = new Schema ({
  user_id : Schema.Types.ObjectId,
  user_name : String,
  destination: String,
  description : String,
  image : {
    pic_path: String
  }
})

module.exports = mongoose.model('Trip', tripSchema)
