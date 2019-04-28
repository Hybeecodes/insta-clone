const mongoose = require('mongoose');
const { Schema } = mongoose;

const LikeSchema = new Schema({
   post: { type: Schema.ObjectId,ref:'Post', required: true},
   author: { type: Schema.ObjectId, ref:'User', required: true}
}, {timestamps: true});

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;