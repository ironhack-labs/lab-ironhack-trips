const express        = require("express");
const router         = require("express").Router();


router.get('/', (req,res)=>{
res.render('index', {title:"hols"});
});
module.exports = router;
