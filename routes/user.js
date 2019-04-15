const express = require('express');

const router = express.Router();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const Follow = require('../models/follow');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(
    new JwtStrategy(opts, function(jwtPayload, done) {
        console.log(jwtPayload);
        User.findOne({ googleID: jwtPayload.data }, function(err, user) {
            console.log(user);
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            return done(null, false);
            // or you could create a new account
        });
    })
);

router.get('/follow/:following', passport.authenticate('jwt'), async (req, res) => {
    try {
        const { following } = req.params;
        const follower = req.user._id;
        // check if follow interaction exists
        const follow = await Follow.findOne({ following, follower });
        if (!follow) {
            // insert new follow record
            const newFollow = await new Follow({ following, follower }).save();
            res.send({ status: 1, message: newFollow });
        }
    } catch (error) {
        res.send({ status: 0, message: error });
    }
});

router.get('/unfollow/:following', passport.authenticate('jwt'), async (req, res) => {
    try {
        // check if interraction exists
        const { following } = req.params;
        const follower = req.user._id;
        // check if follow interaction exists
        const follow = await Follow.findOne({ following, follower });
        if (follow) {
            // insert new follow record
            const removed = await Follow.findOneAndRemove({ following, follower });
            res.send({ status: 1, message: removed });
        }
    } catch (error) {
        res.send({ status: 1, message: error });
    }
});
module.exports = router;
