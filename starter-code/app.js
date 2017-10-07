const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport')
const FbStrategy = require('passport-facebook').Strategy;

// Controllers
const index = require('./routes/index')
const User = require('./models/users')
const Trip = require('./models/trips')
const app = express();

// Mongoose configuration
mongoose.connect("mongodb://localhost/ironhack-trips")

// Middlewares configuration
app.use(logger("dev"))

// View engine configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Access POST params with body parser
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: "my trips"
}))


// PASSSPORT CONFIG
passport.serializeUser((user, cb) => {
  cb(null, user._id)
});

passport.deserializeUser((id, cb) => {
  User.findOne({
    "_id": id
  }, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

// Auth configuration
passport.use(new FbStrategy({
  clientID: "136078950360417",
  clientSecret: "31b8e8eb74345a5b153a9a7c88c2db6e",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({
    facebookID: profile.id
  }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      facebookID: profile.id,
      displayName: profile.displayName
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));


// Initializing Session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;