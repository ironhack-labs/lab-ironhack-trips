const express = require('express')
const router = express.Router()

const tripSchema = new Schema ({
  user_id : Schema.Types.ObjectId,
  user_name : String,
  destination: String,
  description : String,
  image : {
    pic_path: String
  }
})

module.exports = router;
