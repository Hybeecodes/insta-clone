const express = require('express');

const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const User = require('../models/User');
const Post = require('../models/Post');
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

module.exports = router;
