const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const Trip = require("../models/Trip");

const multer = require("multer");
const upload = multer({ dest: __dirname + "/../uploads" });

const ensureLoggedIn = redirectTo => {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect(redirectTo);
    }
  };
};

router.get("/new", ensureLoggedIn("/"), (req, res, next) => {
  res.render("trips/new");
});

router.post("/new", [ensureLoggedIn("/auth/login") , upload.single('picture')], (req, res, next) => {
    const user_id = req.user._id;
    const destination = req.body.destination;
    const description = req.body.description;
    
    User.findById(user_id,(err, user) => {
        console.log(req.picture)
        const newTrip = new Trip({
          destination,
          description,
          user_id,
          provider_name: user.provider_name,
          pic_path: req.file.filename
        });

       
        console.log(newTrip._id)

        newTrip.save().then(c => {
            res.redirect("/my-trips");
          })
          .catch(e => {
            res.redirect("/campaign/new");
          });
      })
      .catch(e => next(e));
  }
);

module.exports = router;
