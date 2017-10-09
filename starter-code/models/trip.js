const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const tripSchema = new Schema({
	userID: {type: Schema.Types.ObjectId, ref: 'User'},
	userName: {type: Schema.Types.ObjectId, ref: 'User'},
	destination: String,
	description: String,
	picPath: String,
	});

module.exports = mongoose.model("Trip", tripSchema);