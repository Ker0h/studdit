const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Thread = require('./thread')

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true, select: false }
})

var User = mongoose.model('user', UserSchema)

module.exports = User