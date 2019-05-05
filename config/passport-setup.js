const passport= require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user')

passport.serializeUser((user,done) =>{
    done(null,user.id);
});

passport.deserializeUser((id,done) =>{
    User.findById(id).then((user) => {
        done(null,user);
    });
});

passport.use(
    new GoogleStrategy({
        // option for google strat
        callbackURL:keys.absoluteURI+'/auth/google/redirect',
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret

    },(accessToken,refreshToken,profile,done) => {
        let newUser = new User({
            username:profile.displayName,
            googleid:profile.id
        });
        done(null,newUser);
       
         //check if user is already in database
      
    })
);