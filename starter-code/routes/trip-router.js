const express = require('express');
const multer = require('multer');
const TripModel = require('../models/trip-model.js');
const router = express.Router();

const myUploader = multer(
  {
    dest: __dirname + '/../public/uploads/'
  }
);

router.get('/my-trips/new', (req, res, next) => {
  if(req.user === undefined) {
    req.flash('securityError', 'Log in to add a trip');
    res.redirect('/');
    return;
  }
    res.render('trip-views/trip-form.ejs');
});

router.post(
  '/my-trips',
  myUploader.single('tripPhoto'), //name that's on the input in the form.
  (req, res, next) => {

  if(req.user === undefined) {
    req.flash('securityError', 'Log in to add a trip');
    res.redirect('/login');
    return;
  }
  //multer creates a "req.file" with all the file info
  // console.log('req.file ------>');
  // console.log(req.file);

    const theTrip = new TripModel({
      destination: req.body.tripName,
      photoUrl: '/uploads/' + req.file.filename, //automatically generated nme for uploaded file
      desc: req.body.tripDesc,
      owner: req.user._id //logged in user's idea from passport
    });

    theTrip.save((err) => {
      if(err) {
        next(err);
        return;
      }
      req.flash('tripFeedback', 'Trip Added.');
      res.redirect('/my-trips');
    });
});

router.get('/my-trips', (req, res, next) => {

    if(req.user === undefined) {
      req.flash('securityError', 'Log in to add a room');
      res.redirect('/login');
      return;
    }

    TripModel.find(

      { owner: req.user._id },

      (err, myRooms) => {
        if(err) {
          next(err);
          return;
        }

        res.locals.securityFeedback = req.flash('securityError');
        res.locals.updateFeedback = req.flash('updateSuccess');
        res.locals.listOfTrips = myRooms;
        res.render('trip-views/user-trips.ejs');
      }
    );
});

router.get('/my-trips/edit/:tripId', (req, res, next) => {

      if(req.user === undefined) {
        req.flash('securityError', 'Log in to edit your trips');
        res.redirect('/');
        return;
      }

      TripModel.findById(
        req.params.tripId,
        (err, tripFromDb) => {
          if(err) {
            next(err);
            return;
          }
          if (tripFromDb.owner.toString() !== req.user._id.toString()) {
            req.flash('securityError', 'You can only edit your trips.');
            res.redirect('/my-trips');
            return;
          }

          res.locals.tripInfo = tripFromDb;
          res.render('trip-views/trip-edit.ejs');
        }
      );
});

// router.post('/rooms/:roomId',
// myUploader.single('roomPhoto'),
// (req, res, next) => {
//       RoomModel.findById(
//         req.params.roomId,
//         (err, roomFromDb) => {
//           if (err) {
//             next(err);
//             return;
//           }
//
//           if (roomFromDb.owner.toString() !== req.user._id.toString()) {
//             req.flash('securityError', 'You can only edit your rooms.');
//             res.redirect('/my-rooms');
//             return;
//           }
//
//           roomFromDb.name = req.body.roomName;
//           roomFromDb.desc = req.body.roomDesc;
//
//           //req.file will be undefined if user doesnt upload anything.
//           //update photourl only if the user uploaded a file
//           if(req.file) {
//             roomFromDb.photoUrl = '/uploads/' + req.file.filename;
//           }
//
//           roomFromDb.save((err) => {
//             if(err) {
//               next(err);
//               return;
//             }
//
//             req.flash('updateSuccess', 'Room update successful.');
//             res.redirect('/my-rooms');
//           });
//         }
//       );
//
// });

module.exports = router;
