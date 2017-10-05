const express = require('express');
const auth = express.Router();
const User = require("../models/user");
const Trip = require("../models/trip");
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });
const bodyParser = require('body-parser');



auth.get('/auth/facebook', passport.authenticate("facebook"));
auth.get('/auth/facebook/callback', passport.authenticate("facebook", {
  successRedirect: "/my-trips",
  failureRedirect: "/"
}));

auth.get('/my-trips', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let userID = req.user._id;
  console.log("DEBUG ", req.user._id);
  console.log("DEBUG TRIP ", res.body);
  console.log("DEBUG PHOTO ", req.file);
  console.log("DEBUG FIND ", Trip.findById("59d672c297abbcc62dfa0aa4"));
  res.render('my-trips', {user: req.user, trip: req.body, photo: req.file});
  next();
});

// UPLOAD PHOTOS

auth.post('/my-trips', upload.single('photo'), (req, res, next) => {

    const userID = req.user._id;
    const tripDestination = req.body.tripDestination;
    const tripReview = req.body.tripReview;
    const tripPhotoPath =`/uploads/${req.file.filename}`;
    const tripPhotoName = req.file.originalname;

    const newTrip = Trip({
      userID,
      tripDestination,
      tripReview,
      tripPhotoPath,
      tripPhotoName,
    });

    console.log("DEBUG TWO ", userID, tripDestination, tripReview, tripPhotoPath, tripPhotoName);

    newTrip.save((err) => {
      res.render('my-trips', {userID, tripDestination, tripReview, tripPhotoPath, tripPhotoName});
    });


});



module.exports = auth;
