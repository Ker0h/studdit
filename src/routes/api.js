const express = require('express')
const router = express.Router({})
const mongoose = require('mongoose')
const User = require('./../models/user')
const Thread = require('./../models/thread')
const Errors = require('./../errorHandling/errorcodes')

/*
* Route files
*/
const user = require('./user')
const thread = require('./thread')
const comment = require('./comment')
const friend = require('./friend')

/*
* User Endpoints
*/
router.route('/login').get( function(req, res) {
    res.status(200).json("whoeeh")
})

router.route('/login').post( function(req, res) {
    let user = req.body.username || ''
    let password = req.body.password || ''

    User.findOne({username : user}, function(error, userdoc){
        if (!userdoc){
            const err = Errors.notFound()
            res.status(err.code).json(err)
        } else {
            if(userdoc.password != password || error){
                const err = Errors.badRequest()
                res.status(err.code).json(err)
            } else{
                res.status(200).json("succesfull login")
            }
        }
    })
})

router.use('/user', user)
router.use('/threads', thread)
router.use('/threads/:threadId/comments', comment)
router.use('/friend', friend)

module.exports = router