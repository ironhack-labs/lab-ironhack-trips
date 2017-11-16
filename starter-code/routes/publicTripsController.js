const express = require('express');
const router = express.Router();
const ensureLogin = require('connect-ensure-login');
const passport = require('passport');
const trip = require('../models/trip')
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

router.get("/", (req, res, next) => { // List with all your trips

  trip.find({}, "destination pic_path")
    .exec()
    .then((result) => res.render('public-trips/index', { result, "user":req.user }))
    .catch(() => console.log("Error finding"));

});

router.get("/detail/:id", (req, res, next) => { // List with all your trips

  trip.findById(req.params.id, "destination description pic_path")
    .exec()
    .then((result) => res.render('public-trips/detail', { result, user:req.user }))
    .catch(() => console.log("Error finding"));

});

module.exports = router;
