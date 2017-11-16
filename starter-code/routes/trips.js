const trips  = require('express').Router();
const multer = require('multer')
const upload = multer({ dest: './public/uploads/' })
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const Trip = require('../models/Trips')

/* GET home page. */
trips.get('/', (req, res, next) => {
  res.render('trips/index')
})

trips.get('/new', (req, res, next) => {
  res.render('trips/new');
})

trips
.post('/new', upload.single('photo'), function(req, res){

  const trip = new Trip({
    user_name: String,
    destination: String,
    description: String,
    pic_path: String
  });

  trip.save((err) => {
    if (err) {
      res.render("trips/new",
        {
          user_name: user.username,
        });
    } else {
      res.redirect("/trips");
    }
  });
});

module.exports = trips;
