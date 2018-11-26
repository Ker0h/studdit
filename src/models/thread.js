const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const ThreadSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: ObjectId, ref: 'user', required: true },
    upvotes: [{ type: ObjectId, ref: 'user', required: true}],
    comments: [CommentSchema]
});

const CommentSchema = new Schema({
    content: { type: String, required: true },
    user: { type: ObjectId, ref: 'user', required: true},
    threadId: { type: ObjectId, ref: 'thread', required: true},
    comments: [this]
});

var Thread = mongoose.model('thread', ThreadSchema)

module.exports = Thread