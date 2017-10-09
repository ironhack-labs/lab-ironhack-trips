const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
	providerId: String,
	providerName: String,
})


module.exports = mongoose.model('userSchema', userSchema)