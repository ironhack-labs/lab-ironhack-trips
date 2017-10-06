const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tripSchema = new Schema({
    user_id: String,
    user_name: String,
    destination: String,
    description: String,
    imgPath: String
})

const Trip = mongoose.model('Trip', tripSchema)

module.exports = Trip