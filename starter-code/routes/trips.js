const express = require('express');
const passport = require('passport');
const router = express.Router();
const ensureLogin = require('connect-ensure-login');
const Trip = require('../models/Trip');
const multer = require('multer');
const upload = multer({dest: './public/uploads'});

// Go into the profile
router.get("/", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Trip.find({'user_id': req.user.provider_id}, (err, trips) => {
      res.render('trips/my-trips', {trips: trips});
  });
});

// Add a new trip
router.get("/new", ensureLogin.ensureLoggedIn(), (req,res,next) => {
  res.render('trips/new-trip');
});

router.post("/new", upload.single('photo'), (req,res,next) => {
  const newTrip = new Trip ({
    user_id: req.user.provider_id,
    user_name: req.user.provider_name,
    destination:  req.body.destination,
    description: req.body.description,
    pic_path: `/uploads/${req.file.filename}`,
  });

  newTrip.save((err) => {
       if (err) {
         res.render("trips/new-trip", { message: "Something went wrong" });
       } else {
         return res.redirect('/trips');
       }
     });
});

// Edit a trip
router.get("/edit/:id", ensureLogin.ensureLoggedIn(), (req,res,next) => {
  Trip.findById(req.params.id, (err, trip) => {
    res.render('trips/edit-trip', {trip});
  });

});

router.post("/edit/:id", upload.single('photo'), (req,res,next) => {
  const newTrip = {
    destination:  req.body.destination,
    description: req.body.description,
  };

  if(req.file){
    newTrip.pic_path = `/uploads/${req.file.filename}`;
  }

  Trip.findByIdAndUpdate(req.params.id, newTrip, (err, trip) => {
    res.redirect('/trips');
  });

});

// Delete page
router.get("/delete/:id", ensureLogin.ensureLoggedIn(), (req,res,next) => {
  Trip.findById(req.params.id, (err, trip) => {
    res.render('trips/delete-trip', {trip});
  });
});

router.get("/deleted/:id", ensureLogin.ensureLoggedIn(), (req,res,next) => {
  Trip.findByIdAndRemove(req.params.id, (err) => {
    res.redirect('/trips');
  });

});

module.exports = router;
