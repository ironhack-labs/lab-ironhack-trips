const router  = require('express').Router()

/* GET home page. */
router.get('/my-trips', (req, res, next) => {
  res.render('trips/my-trips')
})


module.exports = router
