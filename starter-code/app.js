const express        = require("express");
const session        = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const path           = require("path");
const logger         = require("morgan");
const cookieParser   = require("cookie-parser");
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const MongoStore         = require('connect-mongo')(session);
const app            = express();
const bcrypt = require('bcrypt');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FbStrategy = require('passport-facebook').Strategy;
const FBUser = require('./models/FBLogin');

// Controllers

// passport initialize
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  FBUser.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy((username, password, next) => {
  FBUser.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }
    return next(null, user);
  });
}));
passport.use(new FbStrategy({
    clientID: "924679584346537",
    clientSecret: "5329b30abb93b0af3e3fbfd2d1a3ce4f",
    callbackURL: "/auth/facebook/callback"
  }, (accessToken, refreshToken, profile, done) => {
    FBUser.findOne({
          username: profile.displayName
        }, (err, user) => {
          if (err) {
            return done(err);    }
    if (user) {
      return done(null, user);
    }
    console.log(profile);
    const newFB = new FBUser({
      provider_id: profile.id,
      provider_name: profile.displayName
    });
    newFB.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newFB);
    });
  });

}));
//enable sessions here
app.use(session({
  secret: 'tumblrlabdev',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}));
//initialize passport and session here
app.use(passport.initialize());
app.use(passport.session());

// Controllers
const myTripsController = require('./routes/myTripsController');
const loginController = require('./routes/loginController');
const publicTripsController = require('./routes/publicTripsController');
// Routes
app.use('/', loginController);
app.use('/my-trips', myTripsController);
app.use('/public-trips', publicTripsController);
// Mongoose configuration
mongoose.connect("mongodb://localhost/ironhack-trips");

// Middlewares configuration
app.use(logger("dev"));

// View engine configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");
app.use(express.static(path.join(__dirname, "public")));

// Access POST params with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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
