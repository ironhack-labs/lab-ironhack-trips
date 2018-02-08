const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
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
	description: String,
	pic_path: String
}, {
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	});

const User = mongoose.model("Trip", tripSchema);

module.exports = Trip;