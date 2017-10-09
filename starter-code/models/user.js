const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
	facebookName: String,
	//password: String,
	facebookID: String,
	});

module.exports = mongoose.model("User", userSchema);
