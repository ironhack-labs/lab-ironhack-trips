const router  = require('express').Router()
const multer     = require('multer')
const upload     = multer({ dest: './public/uploads/' })
const Trip       = require('../models/Trip')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('trips/index')
})

router.get('/new', (req, res, next) => {
  res.render('trips/new')
})

module.exports = router;
