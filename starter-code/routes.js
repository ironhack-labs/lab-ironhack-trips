const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("./models/User");
const Trip = require("./models/Trip");

//main routes
router.get("/", (req, res, next)=>{
    res.locals.title = "Facebook Login";
    res.render("index");
});

router.get("/error", (req, res)=>{
    res.json({from:"callback2"})
});

//protected
router.get("/profile", ensureAuthenticated, (req, res)=>{

    //get user from db
    User.findOne({provider_id:req.session.passport.user.id}, (err, user)=>{
        if(err){
            console.log(err);
            next();
        } else{
            //console.log(user);
            res.render("profile", {user})
        }
    });

    // return res.json({bliss:"lol",user:req.user});
    // console.log("user? ",user);
    // res.render("account", {user:req.user});
})
.get("/my-trips", ensureAuthenticated,(req, res)=>{
    Trip.find((err, trips)=>{
        if(err) next();
        res.locals.trips = trips;
        res.render("my");
    });
    
})
.get("/my-trips/new", ensureAuthenticated,(req, res)=>{
    Trip.find((err, trips)=>{
        if(err) next();
        res.locals.trips = trips;
        res.render("new");
    });
    
})
.post("/my-trips/new", ensureAuthenticated,(req, res)=>{
    const trip = new Trip(req.body);
    console.log("user? ", req.session);
    trip.user_id = req.session.passport.user.id;
    trip.user_name = req.session.passport.user.displayName;
    trip.save(err=>{
        if (err) next();
        res.redirect("/my-trips");
    })

    
})
.get("/my-trips/edit/:id", ensureAuthenticated, (req,res)=>{
    Trip.findById(req.params.id, (err, trip)=>{
        res.locals.trip = trip;
        res.render("edit");
    });
})
.post("/my-trips/edit/", ensureAuthenticated, (req,res)=>{
    //delete req.body._id;
    //return res.send(req.body);
    Trip.findOneAndUpdate({_id:req.body._id},  req.body, {
        new: true, //return the updated store
        //runValidators: true
    }, (err, trip)=>{
        if(err) return res.send(err);
        res.redirect("/my-trips");
    });
})
.get("/my-trips/delete/:id", ensureAuthenticated, (req,res)=>{
    Trip.findById(req.params.id, (err, trip)=>{
        res.locals.trip = trip;
        res.render("delete");
    });
})
.post("/my-trips/delete/", ensureAuthenticated, (req,res)=>{
    Trip.findOneAndRemove(req.body,(err, trip)=>{
        res.redirect("/my-trips");
       // res.locals.trip = trip;
        //res.render("delete");
    });
});

//public profile

router.get("/users", (req, res)=>{
    User.find((err, users)=>{
        res.locals.users = users;
        res.render("users");
    });
})
.get("/user-trips/:id", (req, res)=>{
    User.findOne({_id:req.params.id}, (err, user)=>{
        if (err) return res.send("usuario no encontrado");
        Trip.find({user_name:user.provider_name}, (err, trips)=>{
            console.log("trips",trips);
            if(err) return res.send("no hay trips")
            res.locals.trips = trips;
            res.locals.user = user;
            res.render("publicTrips");
        });

    })
});



//Social login routes
router.get("/auth/facebook", 
passport.authenticate("facebook"))
// (req, res)=>{
//     //next();
//     //noting to do, just lead to callback
// })
.get("/auth/facebook/callback", 
passport.authenticate('facebook', {failureRedirect:'/error'}),
(req, res)=>{
    res.redirect("/profile");
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  



// test authentication
function ensureAuthenticated(req, res, next) {
    //console.log("segurida: ", req.isAuthenticated())
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
  }


module.exports = router;