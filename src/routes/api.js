const express = require('express')
const router = express.Router({})
const mongoose = require('mongoose')
const User = require('./../models/user')

router.route('/login').get( function(req, res) {
    res.status(200).json("whoeeh")
})

router.route('/login').post( function(req, res) {
    let user = req.body.username || '';
    let password = req.body.password || '';

    console.log(user)
    console.log(password)

    User.find({username : user}, function(error, userdoc){
        console.log(userdoc)
        if (error || !user){
            res.status(400).json("werkt niet")
        } else {
            res.status(200).json("werkt wel!")
        }
    })
        //res.status(200).json('succes');
    
})

module.exports = router;