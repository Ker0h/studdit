const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const ThreadSchema = new Schema({
    title: String,
    content: String,
    user: { type: ObjectId, ref: 'user' },
    upvotes: [{ type: ObjectId, ref: 'user' }]
    comments: [
       CommentSchema
    ]
})

const CommentSchema = new Schema({
    content: String,
    user: { type: ObjectId, ref: 'user'},
    threadId: { type: ObjectId, ref: 'thread'},
    comments: [this]
})

var Thread = mongoose.model('thread', ThreadSchema)

module.exports = Thread