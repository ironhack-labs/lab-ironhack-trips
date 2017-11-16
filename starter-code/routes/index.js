const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Ironhack-trips' });
});

router.get('/facebook',(req, res, next) => {
  res.render('facebook', { title: 'Facebook' });
});


module.exports = router;
