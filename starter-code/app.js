const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const debug = require("debug")('travel-diaries:server');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const authRoute =require('./routes/auth');
const User = require('./models/User');
// Controllers
const indexRoute = require('./routes/index')

const dbURL = "mongodb://localhost/irontrips";
mongoose.connect(dbURL).then( () =>{
  debug(`Connected to ${dbURL}`);
});

// Middlewares configuration
app.use(logger("dev"));

// View engine configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "main-layout");
app.use(express.static(path.join(__dirname, "public")));


// Access POST params with body parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// This middleware stores cookies in the data base
app.use(session({
  secret: "irontrips",
  resave: false,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}));
app.use(cookieParser());

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
const FbStrategy = require('passport-facebook').Strategy;
passport.use(new FbStrategy({
  clientID: "159428197993219",
  clientSecret: "8742e03ea19416a9273e88db71435c21",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      facebookID: profile.id
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", indexRoute);
app.use('/auth', authRoute);

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
