const express = require('express')
const router = express.Router()
const passport = require('passport')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get("/add", (req,res,next)=>{
  console.log("user 8========(·)----__", req.user)
  res.render('trips/new', {user : req.user})
})

module.exports = router
