const router  = require('express').Router()
const multer     = require('multer')
const upload     = multer({ dest: './public/uploads/' })
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const Trip       = require('../models/Trip')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('trips/index')
})

router.get('/new', (req, res, next) => {
  res.render('trips/new')
})


router.post('/new', ensureLoggedIn('/login'), upload.single('photo'), (req, res, next) => {
  new Trip({
    user_id: req.user._id,
    user_name: req.user.facebookName,
    destination: req.body.destination,
    description: req.body.description,
    pic_path: req.file ? `/uploads/${req.file.filename}` : ''
  }).save()
    .then(res.redirect('/my-trips'))
    .catch(err => console.log(err))
})

module.exports = router



 // GET	/my-trips/edit/:trip_id	views/trips/edit.ejs	Edit form
 // POST	/my-trips/edit/:trip_id
 // GET	/my-trips/delete/:trip_id	views/trips/delete.ejs	Delete form
 // POST	/my-trips/delete/:trip_id


module.exports = router
