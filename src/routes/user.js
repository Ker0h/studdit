const express = require('express')
const router = express.Router({})
const mongoose = require('mongoose')
const User = require('./../models/user')
const Errors = require('./../errorHandling/errorcodes')

router.post('/', (req, res) => {
    console.log("hoi")
    let user = req.body.username || '';
    let password = req.body.password || '';

    if (user && password){
        User.save({username : user, password : password })
        res.status(200).json("user saved")

    } else {
        const err = Errors.badRequest()
        res.status(err.code).json(err)
    }
})



router.get('/', (req, res) => {
    console.log("hoi")
    res.status(200).json("werkt")
})

module.exports = router