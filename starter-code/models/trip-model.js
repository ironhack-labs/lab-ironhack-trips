const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true
    },

    user_name: {
      type: String,
      required: true
    },

    destination: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    pic_path: {
      type: String
    }

  }
);

const TripModel = mongoose.model('Trip', tripSchema);

module.exports = TripModel;
