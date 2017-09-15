const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  provider_id: Number,
  provider_name: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model('User', tripSchema);
module.exports = User;
