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
        callbackURL:'https://damreporter.herokuapp.com/auth/google/redirect',
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret

    },(accessToken,refreshToken,profile,done) => {
        
        //check if user is already in database
        User.findOne({googleid:profile.id}).then((currentUser) =>{
            if(currentUser){
                done(null,currentUser);
            }
            else{
                new User({
                    username:profile.displayName,
                    googleid:profile.id
                }).save().then((newUser) => {
                    console.log(newUser);
                    done(null,newUser);
                });
            }
        });
        
    })
);