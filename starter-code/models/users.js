const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  facebookID: String,
  displayName: String
})

const User = mongoose.model("User", userSchema)

module.exports = User