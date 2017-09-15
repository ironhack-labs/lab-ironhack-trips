const express = require('express')
const router = express.Router()
const Trip = require('../models/Trip')
const multer = require('multer')
const passport = require('passport')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const upload = multer({ dest: './public/uploads/' });

router.get("/add", ensureLoggedIn('/login'), (req,res,next)=>{
  res.render('trips/new', {user : req.user})
  console.log(req.user)
})
router.post('/add', ensureLoggedIn('/login'),upload.single('photo'), (req,res,next)=>{
console.log(req.file)
  const newTrip = new Trip ({
    user_id : req.user_id,
    user_name : req.user.provider_id,
    destination : req.body.destination,
    description : req.body.description,
    image : {
      pic_path: `/uploads/${req.file.filename}`},
  }).save().then(()=>res.redirect("/my-trips"))
  .catch((err)=> {
    next(err)})
})
module.exports = router
