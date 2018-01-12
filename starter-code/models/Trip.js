const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const tripSchema = new Schema({
    user_id: String,
    user_name: String,
    destination: String,
    description: String,
    pic_path: String
});

module.exports = mongoose.model("Trip", tripSchema);