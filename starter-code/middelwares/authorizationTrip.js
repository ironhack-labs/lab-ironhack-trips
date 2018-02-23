const Trip = require('../models/trip.js');

function authorizeTrip(req, res, next){
  Trip.findById(req.params.id, (err, trip) => {
    // If there's an error, forward it
    if (err)      { return next(err) }
    // If there is no campaign, return a 404
    if (!trip){ return next(new Error('404')) }
    // If the campaign belongs to the user, next()
    if (trip.user_id.equals(req.user._id)){
      return next()
    } else {
    // Otherwise, redirect
      return res.redirect(`/my-trips/${trip._id}`)
    }
  });
}



module.exports = {authorizeTrip} ;