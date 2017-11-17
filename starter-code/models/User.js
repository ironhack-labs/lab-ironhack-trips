const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    photo: String,
    provider: String,
    provider_id: String,
    facebookID: String,
    createdAt: { type: Date, default: Date.now }, 
}); 

const User = mongoose.model('User', userSchema);

// module.exports = User;