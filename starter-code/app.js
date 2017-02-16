/*jshint esversion:6*/
const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require('connect-flash');
const app = express();

// Controllers

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
app.use(bodyParser.urlencoded({
  extended: false
}));

// Authentication
app.use(session({
  secret: "ironhack trips",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

passport.use('local-login', new LocalStrategy((username, password, next) => {
  User.findOne({
    username
  }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, {
        message: "Incorrect username"
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, {
        message: "Incorrect password"
      });
    }

    return next(null, user);
  });
}));

passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  },
  (req, username, password, next) => {
    // To avoid race conditions
    process.nextTick(() => {
      User.findOne({
        'username': username
      }, (err, user) => {
        if (err) {
          return next(err);
        }

        if (user) {
          return next(null, false);
        } else {
          // Destructure the body
          const {
            username,
            email,
            password,
            // pic_path,
            // pic_name,
            timestamps
          } = req.body;
          const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
          const newUser = new User({
            username,
            email,
            password: hashPass,
            // namePicture: req.body.namePicture,
            // pic_path: `/uploads/${req.file.filename}`,
            // pic_name: req.file.originalname,
            timestamps
          });

          newUser.save((err) => {
            if (err) {
              next(null, false, {
                message: newUser.errors
              });
            }
            return next(null, newUser);
          });
        }
      });
    });
  }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components/')));

// Routes
// app.use("/", index);
const index = require('./routes/index');
const authRoutes = require('./routes/authentication');
app.use('/', index);
app.use('/', authRoutes);

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
