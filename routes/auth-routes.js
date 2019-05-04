
const express = require('express');
const router = express.Router();
const passport= require('passport');
const path = require('path');




//auth logout from app
router.get('/logout',(req,res) => {
    //handle with passport
    req.logout();
    req.session = null;
    res.redirect('/');
});

//auth with google
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));


//callback route for google ro redirect to
router.get('/google/redirect',passport.authenticate('google'), (req,res) =>{
    req.session.token = req.session.passport.user;
    //res.redirect('/reportdamage');
    res.send("Welcome User");
   
});


module.exports = router;