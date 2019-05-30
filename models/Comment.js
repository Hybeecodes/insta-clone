const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    message: { type: String, required: true},
    post: { type: Schema.ObjectId, ref: 'Post', required: true},
    author: { type: Schema.ObjectId, ref: 'User', required: true}
}, { timestamps: true});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;