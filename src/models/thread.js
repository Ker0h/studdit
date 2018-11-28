const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const CommentSchema = require('./comment.schema')

const ThreadSchema = new Schema({
    title: { type: String, required: true, unique: true},
    content: { type: String, required: true },
    user: { type: ObjectId, ref: 'user', required: true },
    upvotes: [{ type: ObjectId, ref: 'user', required: true}],
    downvotes: [{ type: ObjectId, ref: 'user', required: true}],
    totalUpvotes: { type: Number, default: 0 },
    totalDownvotes: { type: Number, default: 0 },
    comments: [CommentSchema]
});

var Thread = mongoose.model('thread', ThreadSchema)

module.exports = Thread