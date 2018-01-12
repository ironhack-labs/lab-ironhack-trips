var express = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//passport auth ??

var socialSchema = new Schema({
    provider_id:String,
    provider_name:String,
    created: Date
});

module.exports = mongoose.model("User", socialSchema);