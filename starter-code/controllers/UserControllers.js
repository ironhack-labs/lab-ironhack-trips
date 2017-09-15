const Trips = require('../models/Trip')
const PATHS = require('../routes/paths')

module.exports = {
  mytripsGet: (req, res) => {
    Trips.find({}, (err, trips) => {
      if (err) { return next(err) }
      return res.render('user/my-trips', {trips: trips})
    })      
  },
  mytripsNewGet: (req, res) => {
    res.render('user/new-trip')
  },
  mytripsNewPost: (req, res) => {
  
  },
  logout: (req, res) => {
    req.logout()
    res.redirect(PATHS.ROOT_PATH)
  }
}