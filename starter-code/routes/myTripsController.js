const express = require('express');
const router = express.Router();
const ensureLogin = require('connect-ensure-login');
const passport = require('passport');
const trip = require('../models/trip')
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

router.get("/", ensureAuthenticated, (req, res, next) => { // List with all your trips

  trip.find({ "user_id" : req.user.provider_id }, "destination pic_path")
    .exec()
    .then((result) => res.render('my-trips/index', { result }))
    .catch(() => console.log("Error finding"));

});

router.get("/new", ensureAuthenticated, (req, res, next) => { // New form

    res.render("my-trips/new");

});

router.post("/new", upload.single('photo'), ensureAuthenticated, (req, res, next) => { // Insert new form

  let newTrip = new trip({
    user_id: req.user.provider_id,
    user_name: req.user.provider_name,
    destination: req.body.destination,
    description: req.body.description,
    });
  if (req.file){
    newTrip['pic_path'] = `/uploads/${req.file.filename}`;
  }
  newTrip.save()

    .then(() => res.redirect('/my-trips'))
    .catch(() => console.log('Error saving!'));
    // Save new trip

});

router.get("/edit/:trip_id", ensureAuthenticated, (req, res, next) => { // Edit form

  trip.findById(req.params.trip_id, "destination description pic_path")
    .exec()
    .then((result) => res.render('my-trips/edit', {result}))
    .catch(() => console.log("ERROR"))

});

router.post("/edit/:trip_id",  upload.single('photo'), ensureAuthenticated, (req, res, next) => { // Edit form

  let editTravel = {
    destination: req.body.destination,
    description: req.body.description
  }
  if (req.file){
    newTrip['pic_path'] = `/uploads/${req.file.filename}`;
  }
  trip.findByIdAndUpdate(req.params.trip_id, editTravel)
    .exec()
    .then(() => res.redirect('/my-trips/'))
    .catch(() => console.log("ERROR"))

});

router.get("/delete/:trip_id", ensureAuthenticated, (req, res, next) => { // Are you sure to delete?

  trip.findById(req.params.trip_id, "destination")
    .exec()
    .then((result) => res.render("my-trips/delete", {result}))
    .catch(() => console.log("ERROR"))

});

router.post("/delete/:trip_id", ensureAuthenticated, (req, res, next) => { // Are you sure to delete?

  trip.findByIdAndRemove(req.params.trip_id)
    .exec()
    .then(() => res.redirect("/my-trips"))
    .catch(() => console.log('error'))

});

function ensureAuthenticated(req, res, next) {

  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }

}
module.exports = router;
