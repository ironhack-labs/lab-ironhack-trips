require('dotenv').config()
const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const passport = require('passport')
const User = require('./models/users');
const Trip = require('./models/trip');
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName']
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function(err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Controllers
const app = express();

const auth = require('./routes/auth.js')

// Mongoose configuration
mongoose.connect("mongodb://localhost/ironhack-trips");

// Middlewares configuration
app.use(logger("dev"));

// View engine configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "../layouts/main-layout");
app.use(express.static(path.join(__dirname, "public")));

// Access POST params with body parser
//app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


// Authentication
app.use(session({
  secret: "ironhack trips",
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(cookieParser());

// Routes

app.use("/", auth);

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