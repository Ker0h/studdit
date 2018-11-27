const express = require('express')
const router = express.Router({})
const mongoose = require('mongoose')
const User = require('./../models/user')
const Errors = require('./../errorHandling/errorcodes')

router.route('/login').get( function(req, res) {
    res.status(200).json("whoeeh")
})

router.route('/login').post( function(req, res) {
    let user = req.body.username || '';
    let password = req.body.password || '';

    console.log(user)
    console.log(password)

    User.findOne({username : user}, function(error, userdoc){
        console.log(userdoc)
        if (error || !userdoc){
            const err = Errors.notFound()
            res.status(err.code).json(err)
        } else {
            if(userdoc.password == password){
                res.status(200).json("wachtwoord is juist")
            }else{
                res.status(400).json("wachtwoord onjuist")
            }

            //res.status(200).json("werkt wel!")
        }
    })
        //res.status(200).json('succes');
    
})

module.exports = router;