const express = require('express')
const multer = require('multer')
const passport = require('passport')
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const tripController = express.Router()
const Trip = require('../models/trip')

const upload = multer({dest: './public/uploads'})

tripController.get('/index', (req, res, next) => {
    Trip.find({user_id: req.user._id}, (err, trips) => {
        if (err) {
            next(err)
        } else {
            res.render('trips/index' , { trips })
        }
    })
})

tripController.get('/new', (req, res, next) => {
    res.render('trips/new')
})

tripController.post('/my-trips/new',upload.single('photo'), (req, res, next) => {
    if(req.user === undefined) {
        res.redirect('auth/login')
    }

    const newTrip = new trip({
        user_id: req.user._id,
        user_name: req.user.provider_name,
        destination: req.body.destination,
        description: req.body.description,
        imgPath: `/uploads/${req.file.filename}`
    })

    newTrip.save((err) => {
        if (err) {
            res.render('trips/new')
        } else {
            res.redirect('trips/index')
        }
    })
})

tripController.get("/trips/index", ensureLoggedIn(), (req, res) => {
  res.render("trips/index", {
    user: req.user
  });
});

module.exports = tripController