const express        = require("express");
const session        = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const path           = require("path");
const logger         = require("morgan");
const cookieParser   = require("cookie-parser");
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const passport		 = require("passport");
const FbStrategy	 = require('passport-facebook').Strategy;
const User			 = require("./models/user");
const app            = express();

// Controllers
const authController = require("./routes/authController");
const indexController = require("./routes/indexController");

// Mongoose configuration
mongoose.connect("mongodb://localhost:27017/ironhack-trips");

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
app.use(bodyParser.urlencoded({ extended: false }));

// Authentication
app.use(session({
  secret: "ironhack trips"
}));
app.use(cookieParser());

passport.use(new FbStrategy({
	clientID: "1925251437804257",
	clientSecret: "dd94e7ca262443656dcf0e7459025f0d",
	callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
	User.findOne({ provider_id: profile.id }, (err, user) => {
		if (err) {
			return done(err);
		}
		if (user) {
			return done(null, user);
		}

		const newUser = new User({
			provider_id: profile.id,
			provider_name: profile.displayName
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
app.use("/", indexController);
app.use("/", authController);

app.use("/", (req, res, next) => {
	if (req.isAuthenticated()) {
		res.locals.currenUser = req.user;
	}
});

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
