const express = require('express');
const User = require('../models/user');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


const ensureLoggedIn = (rutaNoAutenticado, rutaNoPermisos, role) => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      if(req.user.role && req.user.role == role){
        return next();
      }else{
        console.log("El usuario esta autenticado, pero no tiene el rol " + role);
        return res.redirect(rutaNoPermisos);
      }
    } else {
      res.redirect(rutaNoAutenticado);
    }
  };
};

router.get("/private-teacher", ensureLoggedIn('/auth/login','/','teacher'), (req, res) => {
  res.render("private", { user: req.user });
});

router.get("/private-normal", ensureLoggedIn('/auth/login','/'), (req, res) => {
  res.render("private", { user: req.user });
});



module.exports = router;
