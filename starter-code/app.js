const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const FbStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const Trip = require('./models/trip')
const app = express();

// Controllers
const authController = require("./routes/authController");
const tripController = require('./routes/tripController')
// Mongoose configuration
mongoose.connect("mongodb://localhost/ironhack-trips");

// Middlewares configuration
app.use(logger("dev"));
passport.use(
  new FbStrategy(
    {
      clientID: "146909125915897",
      clientSecret: "af583a70ca9e7c54aa392345e4fa6189",
      callbackURL: "http://localhost/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookID: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }
        newUser.save(err => {
          if (err) {
            return done(err);
          }
          done(null, newUser);
        });
      });
    }
  )
);

// View engine configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");
app.use(express.static(path.join(__dirname, "public")));

// Access POST params with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Authentication
app.use(
  session({
    secret: "ironhack trips",
    resave: true,
    saveUninitialized: true
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
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
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

// Routes
app.use("/", authController);
app.use('/trips', tripController)

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
