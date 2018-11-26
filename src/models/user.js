const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Thread = require('./thread')

const UserSchema = new Schema({
    username: String,
    password: String
})

var User = mongoose.model('User', UserSchema)

module.exports = User