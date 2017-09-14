const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.user);
  res.render('index');

//
//   if (req.user){
//       res.locals.securityFeedback = req.flash('securityError');
//       res.locals.roomSuccess = req.flash('roomFeedback');
//       res.render('user-home.ejs');
//   }
//   else{
//       res.locals.signupFeedback = req.flash('signupSuccess');
//
//     }


});

module.exports = router;
