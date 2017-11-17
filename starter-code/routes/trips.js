const express = require('express');
const multer  = require('multer');
const Trip = require('../models/Trip');

const router = express.Router();
const upload = multer({ dest: './uploads/' });

router.get('/', (req, res, next) => {
  Trip.find({'user_id': req.user._id}, (error, trips) => {
    if (error) { return next(error); }
    console.log(trips);
    res.render('trips/index', {trips});
  });
});

router.get('/new', (req, res, next) => {
  res.render('trips/new');
});

router.post('/new', upload.single('photo'), (req, res, next) => {
  const newTrip = new Trip({
    user_id: req.user._id,
    user_name: req.body.user_name,
    destination: req.body.destination,
    description: req.body.description,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });

  newTrip.save((error) => {
    if (error) { return next(error); }
    res.redirect('/my-trips');
  });
});

router.get('/edit/:trip_id', (req, res, next) => {
  Trip.findOne({'_id': req.params.trip_id}, (error, trip) => {
    if (error) { return next(error); }
    res.render('trips/edit', trip);
  });
});

router.post('/edit/:trip_id', (req, res, next) => {
  const updateTripInfo = {
    user_id: req.user._id,
    user_name: req.body.user_name,
    destination: req.body.destination,
    description: req.body.description,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  };

  Trip.findByIdAndUpdate(req.params.trip_id, updateTripInfo, (error, trip) => {
    if (error) { return next(error); }
    res.redirect('/my-trips');
  });
});

router.get('/delete/:trip_id', (req, res, next) => {
  Trip.findOne({'_id': req.params.trip_id}, (error, trip) => {
    if (error) { return next(error); }
    res.render('trips/delete', {trip});
  });
});

router.post('/delete/:trip_id', (req, res, next) => {
  Trip.findByIdAndRemove(req.params.trip_id, (error, trip) => {
    if (error) { return next(error); }
    res.redirect('/my-trips');
  });
});

module.exports = router;
