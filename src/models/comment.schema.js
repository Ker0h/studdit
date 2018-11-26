const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const CommentSchema = new Schema({
    content: { type: String, required: true },
    user: { type: ObjectId, ref: 'user', required: true},
    threadId: { type: ObjectId, ref: 'thread', required: true},
    upvotes: [{ type: ObjectId, ref: 'user', required: true}],
    downvotes: [{ type: ObjectId, ref: 'user', required: true}],
    comments: [this]
});

module.exports = CommentSchema

