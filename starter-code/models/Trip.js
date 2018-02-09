const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    user_name: { type: String, required: true },
    destination: String,
    description: String,
    pic_path: {
      type: String,
      default:
        "https://placeholdit.imgix.net/~text?txtsize=50&txt=MyTrip&w=650&h=250"
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

module.exports = Trip;