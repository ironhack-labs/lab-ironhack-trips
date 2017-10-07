const express = require("express");
const session = require("express-session");
//const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const passport = require("passport");
const FbStrategy = require("passport-facebook").Strategy;
const index = require("./routes/index");
const flash = require('connect-flash');
// Controllers

// Mongoose configuration
mongoose.connect("mongodb://localhost/ironhack-trips");
// Middlewares configuration
app.use(logger("dev"));

// View engine configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//app.use(expressLayouts);
//app.set("layout", "layouts/main-layout");
app.use(express.static(path.join(__dirname, "public")));

// Access POST params with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Authentication
app.use(session({
    secret: "ironhack trips"
}));
app.use(cookieParser());

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));

passport.use(new FbStrategy({
    clientID: "134352490537335",
    clientSecret: "fb2726ef6ae69b6aaf535931c24cbfd7",
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
app.use(flash()); // use connect-flash for flash messages stored in session
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