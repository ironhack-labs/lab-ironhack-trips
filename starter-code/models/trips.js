const mongoose = require("mongoose")
const Schema = mongoose.Schema

const tripsSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  user_displayname: String,
  destination: String,
  description: String,
  pic_path: String
})

const Trip = mongoose.model("Trip", tripsSchema)

module.exports = Trip