const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const tripSchema = new Schema({
  user_id: String,
  user_name: String,
  destination: String,
  description: String,
  pic_path: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;

//
// user_id, will contain the user provider id.
// user_name, will contain the user provider name.
// destination, will contain our destination title.
// description, will contain a description indicating our opinion of the destination.
// pic_path, will contain a photo of our destination.
