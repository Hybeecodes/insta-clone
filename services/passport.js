const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null,user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/api/auth/google/callback',
        },
        async function(accessToken, refreshToken, profile, done) {
            // check if user exists
            const user = await User.findOne({ googleID: profile.id });
            if (!user) {
                // add new user
                const newUser = new User({
                    googleID: profile.id,
                });
                const newuser = await newUser.save();
                done(null, newuser);
            } else {
                done(null, user);
            }
        }
    )
);
