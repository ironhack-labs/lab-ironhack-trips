var express = require('express');
var router = express.Router();
const Trip = require("../models/Trip");

/* GET home page. */
router.get('/', function(req, res, next) {
  Trip.find({})
  .populate("user_id")
  .then(trips => {
    console.log(trips)
    res.render("index", {trips})
  })
  .catch (err => res.render("error"))   
});

module.exports = router;
