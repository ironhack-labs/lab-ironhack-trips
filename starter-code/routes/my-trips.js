const express = require('express');
const tripController = express.Router();
const Trip = require('../models/Trip');
const ensureLogin = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({dest:'./public/uploads'});

tripController.get('/', ensureLogin.ensureLoggedIn() , (req, res) => {
  Trip.find({'user_id': req.user._id}, (err, trips) => {
    res.render('profile/private', {trips : trips});
  })
})

tripController.get('/new', ensureLogin.ensureLoggedIn(), (req,res) => {
  res.render('trips/new')
});

tripController.post('/new',upload.single('photo'), (req,res)=>{

const newTrip = new Trip ({
  user_id: req.user._id,
  user_name: req.user.name,
  destination: req.body.destination,
  description: req.body.description,
  pic_path: `/uploads/${req.file.filename}`,
});

newTrip.save()
  .then(() =>{
    res.redirect('/my-trips');
  })
  .catch(e => {
    console.log('Error')
    res.render('trips/new')
  })
})

tripController.get('/edit/:id', ensureLogin.ensureLoggedIn(), (req,res) => {
  Trip.findById(req.params.id, (err,trip) => {
    res.render('trips/edit', {trip:trip});
  })
});

tripController.post('/edit/:id',upload.single('photo'), (req,res)=>{

const newTrip =({
  destination: req.body.destination,
  description: req.body.description,
});

if(req.file) {
  newTrip.pic_path =`/uploads/${req.file.filename}`;
}

Trip.findByIdAndUpdate(req.params.id, newTrip, (err) => {
  if(err) console.log(err);
  res.redirect('/my-trips');
})

})


module.exports = tripController;
