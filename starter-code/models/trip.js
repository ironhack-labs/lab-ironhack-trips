const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  userID: String,
  tripDestination: String,
  tripReview: String,
  tripPhotoPath: String,
  tripPhotoName: String,
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
