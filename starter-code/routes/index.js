
const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/my-trips', (req, res, next) => {
  res.render('my-trips', {user: req.user});
});
module.exports = router;
