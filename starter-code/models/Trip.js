const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    user_name: String,
    destination: String,
    description: String,
    pic_path: String,
    pic_name: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
