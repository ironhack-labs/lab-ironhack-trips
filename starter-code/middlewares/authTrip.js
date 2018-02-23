const Trip = require('../models/Trip');

function authorizeTrip(req, res, next){
  Trip.findById(req.params.id, (err, trip) => {
    if (err)      { return next(err) }
    if (!trip){ return next(new Error('404')) }
    if (trip.user_id.equals(req.user._id)){
      return next()
    } else {
      return res.redirect(`/mytrips/${trip._id}`)
    }
  });
}

module.exports = {authorizeTrip};