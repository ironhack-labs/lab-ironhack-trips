var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const expressLayouts     = require('express-ejs-layouts');
const session            = require('express-session');
const mongoose           = require('mongoose');
const MongoStore         = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost:27017/tumblr-lab-development');
const FbStrategy = require('passport-facebook').Strategy;
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(expressLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Passport
const passport   = require('passport');

//Facebook
passport.authenticate("facebook");


app.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/auth/login")
})

app.get("/facebook", passport.authenticate("facebook"));

app.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/trips",
  failureRedirect: "/",
}));

passport.use(new FbStrategy({
  clientID: "151536418796740",
  clientSecret: "d1e641e18bc3740aebf496d0bb8cd6b0",
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

var index = require('./routes/index');
// var users = require('./routes/users');
const authRoutes = require('./routes/auth');
const trips = require('./routes/trips');

app.use("/", index)
app.use("/", authRoutes)
app.use("/trips", trips)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
