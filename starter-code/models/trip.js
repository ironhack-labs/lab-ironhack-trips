const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const tripSchema = {
	user_id: String,
	user_name: String,
	destination: String,
	description: String,
	pic_path: String,
}

module.exports = mongoose.model('tripSchema', tripSchema)