const express  = require('express');
const Trip = require('../models/trip');
const router   = express.Router();
const { ensureLoggedIn }  = require('connect-ensure-login');
//Para hacer un populate hay que traer el modelo-extra
const User = require ("../models/user.js");
//esto es para subir multer
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });


const {authorizeTrip} = require ("../middelwares/authorizationTrip.js")


router.get('/new', (req, res) => {
    res.render('trips/new');
  });


router.post('/new', ensureLoggedIn(),upload.single('photo'), (req, res, next) => {
    console.log(req.file)
    const newTrip = new Trip({
      user_id: req.user._id,
     //user_name: req.body.user,
      description: req.body.description,
      destination: req.body.destination,
      pic_path: `/uploads/${req.file.filename}`
    });

  
    newTrip.save()
      .then(tripcreated => res.redirect(`/my-trips`))
      .catch(err => res.render("error"));
  });



// router.get('/edit/:id',checkOwnership , (req, res, next) => {
//     Campaign.findById(req.params.id)
//       .populate("_creator")
//       .then(result => res.render("campaign/single", {campaign:result}))
//   });

// router.get('/:id/edit', ensureLoggedIn('/login'), authorizeCampaign, (req, res, next) => {
//     Campaign.findById(req.params.id, (err, campaign) => {
//       if (err)       { return next(err) }
//       if (!campaign) { return next(new Error("404")) }
//       return res.render('campaigns/edit', { campaign, types: TYPES })
//     });
//   });

// router.post('/:id/edit', ensureLoggedIn('/login'), authorizeCampaign, (req, res, next) => {
//     const updates = {
//       title: req.body.title,
//       goal: req.body.goal,
//       description: req.body.description,
//       category: req.body.category,
//       deadline: req.body.deadline
//     };
//     Campaign.findByIdAndUpdate(req.params.id, updates, (err, campaign) => {
//       if (err) {
//         return res.render('campaigns/edit', {
//           campaign,
//           errors: campaign.errors
//         });
//       }
//       if (!campaign) {
//         return next(new Error('404'));
//       }
//       return res.redirect(`/campaigns/${campaign._id}`);
//     });
//   });

router.get('/', (req, res) => {
    Trip.find({}, (err,docs)=>{
        if(err){
            next();
            return;
        }else{
           // console.log("8===========D")
            console.log(docs);
            res.render("trips/index", {trips:docs});
        }
      });
  });



module.exports = router;