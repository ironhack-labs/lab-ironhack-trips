const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  user_id: String,
  user_name: String,
  destination: String,
  description: String,
  pic_path: String
}, {
  timestamps: {createdAt: "created_at",updatedAt: "updated_at"
  }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
