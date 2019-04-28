const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema(
    {
        author: { type: Schema.ObjectId,ref:'User', required: true },
        media: { type: String, required: true },
        mediaType: { type: String, enum: ['image', 'video'], required: true },
        caption: { type: String, required: false },
        comments: [{type: Schema.ObjectId, ref: 'Comment'}],
        likes: [{type: Schema.ObjectId, ref: 'Like'}]
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
