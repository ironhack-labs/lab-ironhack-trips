const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tripSchema = new Schema(
  {
    destination: {
      type: String,
      // required: true,
    },
    photoUrl: {
      type: String,
      required: true
    },
    desc: {
      type: String,
    },

    owner: {
      type: Schema.Types.ObjectId,
      required: true
    }
},
{
  timestamps: true
});

const TripModel = mongoose.model('Trip', tripSchema);

module.exports = TripModel;
