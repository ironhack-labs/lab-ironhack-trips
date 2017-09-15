const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  provider_id: String,
  provider_name: String
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
