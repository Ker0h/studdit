const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const CommentSchema1 = require('./comment1.schema')

const CommentSchema2 = new Schema({
    content: { type: String, required: true },
    user: { type: ObjectId, ref: 'user', required: true},
    thread: { type: ObjectId, ref: 'thread', required: true},
    upvotes: [{ type: ObjectId, ref: 'user', required: true}],
    downvotes: [{ type: ObjectId, ref: 'user', required: true}],
    totalUpvotes: { type: Number, default: 0 },
    totalDownvotes: { type: Number, default: 0 },
    comments: [CommentSchema1]
})

module.exports = CommentSchema2