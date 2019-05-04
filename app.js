
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const reportRoutes = require('./routes/user-routes');
const damageRoutes = require('./routes/damage-routes');
const passportSetup = require('./config/passport-setup');
const keys =require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');




mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true }, (err) => {
   
    if(!err){
        console.log('MongoDB connection Succeeded.');
    }
    else{
        console.log(err);
    }
    
});


//To extract form data, middleware is used, provided by Express
app.use(express.urlencoded());

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


// create home page view
app.use(express.static('public'));
app.use('/images',express.static('images'));


// set up routes
app.use('/auth',authRoutes);

// set up profile
app.use('/reportdamage',reportRoutes);

// set up profile
app.use('/damages',damageRoutes);



 
const PORT = process.env.PORT || 3000;
app.listen(PORT);
