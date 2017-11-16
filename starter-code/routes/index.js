const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Ironhack-trips' });
});

router.get('/signup',(req, res, next) => {
  res.render('facebook', { title: 'Express - Ironhack-trips' });
});


module.exports = router;
