const express        = require("express");
const session        = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const path           = require("path");
const logger         = require("morgan");
const cookieParser   = require("cookie-parser");
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const app            = express();
//routes
const routes = require("./routes");
//social login
const passport = require("passport");
const config  = require("./oauth");
const FacebookStrategy = require("passport-facebook");
const User = require("./models/User");


//config social
passport.use(new FacebookStrategy({
  clientID: config.facebook.clientId,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
},
  function(accessToken, refreshToken, profile, done){

    //saving to database
    User.findOne({ provider_id: profile.id}, (err, user)=>{
      if (err) console.log(err);
      if (!err && user !== null){
        done(null, user);
      } else {
        user = new User({
          provider_id: profile.id,
          provider_name: profile.displayName,
          created: Date.now()
        });
        user.save(err=>{
          if (err){
            console.log(err);
          } else {
            console.log("Guardando usuario...");
            done(null, user);
          }
        });
      }
    });


    process.nextTick(()=>{
      return done(null, profile);
    });   
  }
));



// Controllers

// Mongoose configuration
mongoose.connect("mongodb://localhost/ironhack-trips", {useMongoClient:true});

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



//social login config
//ES SUPER IMPORTANTE INIZIALIZAR PASSPORT DESPUES DE LAS EXPRESS SESSION
app.use(passport.initialize());
app.use(passport.session());

//Session and serializer
passport.serializeUser((user, done)=>{
  done(null, user);
});
passport.deserializeUser((obj, done)=>{
  done(null, obj);
});


// Routes
app.use("/", routes);

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
