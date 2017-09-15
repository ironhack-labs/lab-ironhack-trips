const express = require('express');
const passport = require('passport');
const UserModel = require('../models/user-model.js');
const TripModel = require('../models/trip-model.js');
const ensureLogin = require("connect-ensure-login");
const multer = require('multer');
const myUploader = multer(
  {
      dest: __dirname + '/../public/uploads/'
  }
);


const router  = express.Router();

router.get('/', (req, res, next) => {
  res.render('index.ejs');
});

// Facebook login -------------------------------------------------

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/my-trips',
    failureRedirect: '/',
    failureFlash: true
  })
);

//Get my-trips

router.get('/my-trips', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {

  TripModel.find(
      { user_id: req.user._id },

      (err, myTrips) => {
          if (err) {
              next(err);
              return;
          }

          res.locals.tripList = myTrips;

          res.render('mytrips.ejs');

      }
    );
});

//Get new trip form

router.get('/my-trips/new', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {
  res.render('new.ejs');
});

// Post new trip

router.post('/my-trips/new',

  myUploader.single('tripPhoto'),

  (req, res, next) => {

      const theTrip = new TripModel({
          destination: req.body.destinationValue,
          pic_path: '/uploads/' + req.file.filename,
          description: req.body.tripDesc,
          user_id: req.user._id,
          user_name: req.user.provider_name
      });


      theTrip.save((err) => {
          if (err) {
              next(err);
              return;
          }

          res.redirect('/my-trips');
      });
  }
);

// Get edit form

router.get('/my-trips/edit/:tripId', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {

    TripModel.findById(
      req.params.tripId,

      (err, tripFromDb) => {
          if (err) {
              next(err);
              return;
          }

          res.locals.tripInfo = tripFromDb;

          res.render('edit.ejs');
      }
    );
});

// Edit Post

router.post('/my-trips/edit/:tripId',

  myUploader.single('tripPhoto'),

  (req, res, next) => {

      TripModel.findById(
        req.params.tripId,

        (err, tripFromDb) => {
            if (err) {
                next(err);
                return;
            }

            tripFromDb.destination = req.body.destinationValue;
            tripFromDb.description = req.body.tripDesc;

            // "req.file" will be undefined if the user doesn't upload anything

            // update "photoUrl" only if the user uploaded a file

            if (req.file) {
                tripFromDb.pic_path = '/uploads/' + req.file.filename;
            }

            tripFromDb.save((err) => {
                if (err) {
                    next(err);
                    return;
                }

                res.redirect('/my-trips');
            });
        }
      );
  }
);

// Get delete form

router.get('/my-trips/delete/:tripId', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {

    TripModel.findById(
      req.params.tripId,

      (err, tripFromDb) => {
          if (err) {
              next(err);
              return;
          }

          res.locals.tripInfo = tripFromDb;

          res.render('delete.ejs');
      }
    );
});

// Delete

router.post('/my-trips/delete/:tripId', (req, res, next) => {
  TripModel.findByIdAndRemove(
    req.params.tripId,

    (err, tripFromDb) => {
        if (err) {
            next(err);
            return;
        }

        res.redirect('/my-trips');
    }
  );
});

module.exports = router;
