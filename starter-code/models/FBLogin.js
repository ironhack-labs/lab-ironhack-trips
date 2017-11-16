const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const FBSchema = new Schema({
  provider_id: String,
  provider_name: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const FBLogin = mongoose.model('FBLogin', FBSchema);
module.exports = FBLogin;
