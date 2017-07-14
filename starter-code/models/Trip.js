const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = Schema({
  user_id: String,
  user_name: String,
  destination: String,
  description: String,
  picPath: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
