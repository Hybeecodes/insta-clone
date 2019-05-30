const express = require('express');
const router = express.Router();
const ensureAuth = require('../middlewares/ensureAuth');
const User = require('../models/User');
const Follow = require('../models/follow');


router.post('/:id/follow', ensureAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const follower = req.user._id;
        // check if follow interaction exists
        const follow = await Follow.findOne({ id, follower });
        if (!follow) {
            // insert new follow record
            const newFollow = await new Follow({ id, follower }).save();
            const follwingUser = await User.findById(id);
            follwingUser.followers.push(follower);
            await follwingUser.save();
            const followerUser = await User.findById(follower);
            followerUser.following.push(id);
            await followerUser.save();
            res.status(200).send(newFollow);
        }else{
            res.status(400).send('Bad Request');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Error, please try again" });
    }
});

router.post('/:id/unfollow', ensureAuth, async (req, res) => {
    try {
        // check if interaction exists
        const { id } = req.params;
        const follower = req.user._id;
        // check if follow interaction exists
        const follow = await Follow.findOne({ id, follower });
        if (follow) {
            // insert new follow record
            const removed = await Follow.findOneAndRemove({ id, follower });
            const followingUser = await User.findById(id);
            followingUser.followers = followingUser.followers.filter((followerId) => {
                return followerId !== follower;
            });
            await followingUser.save();
            const followerUser = await User.findById(follower);
            followerUser.following = followerUser.following.filter((followingId) => {
                return followingId !== id;
            });
            await followerUser.save();
            res.status(200).send(removed);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Error, please try again" });
    }
});

router.get('/search/:query',ensureAuth, async (req,res) => {
    try {
        const { query } = req.params;
        const users = await User.find({username: new RegExp(`${query}`, "i")});
        res.status(200).send({ status: 1, message: users});
    }catch(error) {
        console.log(error);
        res.status(500).send({ error: "InternanewFollowl Error, please try again" });
    }

});

router.get('/:username',ensureAuth ,async (req, res) => {
   try {
       const { username } = req.params;
       const user = await User.aggregate([
           {
               $match: {
                   username : username
               }
           },
           {
               $lookup: {
                   from: 'posts',
                   localField: '_id',
                   foreignField: 'author',
                   as: 'posts'
               }
           },
           {
               $lookup: {
                   from: 'follows',
                   localField: '_id',
                   foreignField: 'following',
                   as: 'followers'
               }
           },
           {
               $lookup: {
                   from: 'follows',
                   localField: '_id',
                   foreignField: 'follower',
                   as: 'followings'
               }
           }
       ]);
       res.status(200).send({ status: 1, message: user});
   } catch (error) {
       console.log(error);
       res.status(500).send({ error: "Internal Error, please try again" });
   }
});
module.exports = router;
