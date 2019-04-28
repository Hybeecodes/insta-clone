const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const ensureAuth = require('../middlewares/ensureAuth');
const keys = require('../config/keys');

const storage = multer.diskStorage({
    filename(req, file, callback) {
        // accept image files only
        callback(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });

cloudinary.config({
    cloud_name: keys.cloud_name,
    api_key: keys.api_key,
    api_secret: keys.api_secret,
});

router.get('/',ensureAuth, async (req,res) => {
    // TODO:  get all user posts, all user following posts
    try {
        // fetch all posts for now
        const posts = await Post.find().populate('author');
        res.status(200)
            .send(posts);
    }catch(error){
        console.log(error);
        res.status(500)
            .send("Error registering new user please try again.");
    }

});

router.post('/new',ensureAuth, upload.single('media'), async (req, res) => {
    try {
        if (req.file) {
            if (req.file.path) {
                const result = await cloudinary.uploader.upload(req.file.path);
                // add cloudinary url for the image to the campground object under image property
                // req.body.campground.image = result.secure_url;
                // console.log('result ',result);
                const media = result.url;
                const mediaType = result.resource_type;
                const imageId = result.public_id;
                // console.log(req.file);
                const { caption } = req.body;
                let newPost = new Post({
                    author: req.user._id,
                    media,
                    mediaType,
                    caption,
                });
                newPost = await newPost.save();
                return res.json({ status: 1, message: newPost });
            }
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: 0, message: error });
    }
});

router.post('/:id/comment', ensureAuth, async (req,res) => {
    const { id } = req.params;
    const { comment } = req.body;
    try {
        // get post
        const post = await Post.findById(id);
        if(post){
            // add comments
            const newComment = await new Comment({
                message: comment,
                post: id,
                author: req.user._id
            }).save();
            post.comments.push(newComment._id);
            // save updated post
            await post.save();
            return res.status(200).json({ status: 1, message: newComment });
        }
    }catch(err) {
        res.status(500).json({error:'Internal error, please try again'});
    }
});

router.post('/:id/like',ensureAuth, async (req,res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if(post){
            // check if like exists
            const like = await Like.findOne({ post: id, author: req.user._id });
            if(!like){
                const newLike = await new Like({ post: id, author: req.user._id}).save();
                post.likes.push(newLike._id);
                await post.save();
                res.status(200).json({status:1,message:newLike});
            }else{
                res.status(200).json({status:2,message:like});
            }
        }
    }catch(err) {
        console.log(err);
        res.status(500).json({error:'Internal error, please try again'});
    }

});

router.post('/:id/unlike', ensureAuth, async (req,res) => {
    try {
        const { id } =req.params;
        const post = await Post.findById(id);
        if(post){
            // find like and delete it
            const like = await Like.findOne({ post: id, author: req.user._id });
            console.log(like);
            if(like){
                await Like.findByIdAndRemove(like._id);
                // remove from post like array
                const postLikes = post.likes;
                post.likes = postLikes.filter((likeId) => {
                    // console.log(typeof likeId);
                    return String(likeId) !== String(like._id);
                });
                console.log(like._id);
                console.log(post.likes);
                await post.save();
                res.status(200).send("Success");
            }
        }
    } catch (err){
        console.log(err);
        res.status(500).json({error:'Internal error, please try again'});
    }
});

module.exports = router;
