const express = require('express');
const users = require('../models/User');
const multer = require('multer');
const Picture = require('../models/Picture');
const Trip = require('../models/Trip');
const path = require('path');
const router  = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/profile', (req, res, next) => {
    console.log("hola");
  Trip.find({}, (err, viajes) => {
      if (err) { return next(err); }
    res.render('profile', {
      viajes: viajes
    });
  });
});

router.get('/trip/new', (req, res, next) => {
  res.render('trips/new');
});

router.post('/trip/new', (req, res, next) => {
    const newtrip = {
      user_name: req.body.user_name,
      destination: req.body.destination,
      description: req.body.description,
      pic_path: req.body.pic_path
    };

    const addTrip = new Trip(newtrip);

    addTrip.save((err) => {
      if (err) { return next(err); }
      return res.redirect('/profile');
    });
  });


  router.get('/trip/:id', (req, res, next) => {
    let id = req.params.id;
    Trip.findById(id, (err, viaje) => {
      res.render('trips/show', {
        viaje: viaje
      });
  });
  });


  router.get('/upload/:id/image', (req, res, next) => {
    let id = req.params.id;
    Trip.findById(id, (err, viaje) => {
      res.render('trips/uploadpictures', {
        viaje: viaje
      });
    });
  });

var upload = multer({ dest: './public/uploads/' });

router.post('/trip/:id', upload.single('photo'), function(req, res){

console.log(req.file)
  const update = {
    destination: req.body.destination,
    description: req.body.description,
    pic_path: `/uploads/${req.file.filename}`,
  };

  Trip.findByIdAndUpdate(req.params.id, (err, update ) => {
      res.redirect('/trip/:id');
  });
});

router.post('/trip/:id/delete', (req, res, next) => {
  let id = req.params.id;

  Trip.findByIdAndRemove(id, (err, product) => {
    if (err){ return next(err); }
    return res.redirect('/profile');
  });
});

router.get('/trip/:id/edit', (req, res, next) => {
  let id = req.params.id;

  Trip.findById(id, (err, viaje) => {
    res.render('trips/edit', {
      viaje: viaje
    });
  });
});

router.post('/trip/:id', (req, res, next) => {
  user_name = req.body.user_name;
  destination = req.body.destination;
  description = req.body.description;
  pic_path = req.body.pic_path;

  Trip.findByIdAndUpdate(id, updates, (err, trip) => {
    if (err){ return next(err); }
    return res.redirect('/profile');
  });
});


module.exports = router;
