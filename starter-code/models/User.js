const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 
 const userSchema = new Schema({
     provider_id: String,
     provider_name: String,
     facebookID: String
 }, {
     timestamps: {
         createdAt: "created_at",
         updatedAt: "updated_at"
     }
 });
 
 
 module.exports =  mongoose.model("User", userSchema);