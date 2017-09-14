const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const tripSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId},
    user_name: {type:String},
    destination: {type: String},
    description: {type: String},
    pic_path: {type: String}
});

const TripModel = mongoose.model('Trip', tripSchema);

module.exports = TripModel;
