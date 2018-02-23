const express = require('express');
const router  = express.Router();



router.get('/private', (req, res, next) => {
    console.log("hola k ase")
    res.render("user/private")
});

/* GET home page. */
router.get('/', (req, res, next) => {
  
    res.render("index", {title :"Ironhack Trips"})
});

module.exports = router;