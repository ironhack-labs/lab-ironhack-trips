const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tripSchema = new Schema({
      name: {
        type: String,
        required: true
      },
      pic_path: {
        type: String,
        required: true
      },
      destination: {
        type: String
      },
      description: {
        type: String
      },
      // the mongo ID of the user that this room belongs to
      owner: {
        type: Schema.Types.ObjectId,
        required: true
      }
  },

  {
      // adds "createdAt" and "updatedAt" to the schema
      timestamps: true
  }
);

const TripModel = mongoose.model('trips', tripSchema);


module.exports = TripModel;
