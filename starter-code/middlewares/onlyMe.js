
const onlyMe = (req,res,next) => {
    // Supongo que tengo que cambiar el req.query.id por el id de Facebook. Cual de los dos, provider_id o provider_name???
    if(req.user._id == req.query.id){
        next();
    }else{
        console.log("[Forbidden] User cannot access this page");
        res.redirect('/');
    }
}

module.exports = onlyMe;