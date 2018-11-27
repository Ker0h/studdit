const express = require('express')
const router = express.Router({})
const mongoose = require('mongoose')
const User = require('./../models/user')
const Errors = require('./../errorHandling/errorcodes')

router.post('/', (req, res) => {
    let user = req.body.username || ''
    let password = req.body.password || ''

    if (user && password){
        userdoc = new User({
            username : user,
            password : password
        })
        userdoc.save({username : user, password : password }, (err) => {
            if(!err){
                res.status(200).json("user saved")
            } else {
                console.log(err)
                res.status(400).json(err)
            }
        })
    } else {
        const err = Errors.badRequest()
        res.status(err.code).json(err)
    }
})

router.put('/', (req, res) => {
    let user = req.body.username || ''
    let password = req.body.password || ''
    let newpassword = req.body.newpassword || ''

    User.findOne({username : user}, function(error, userdoc){
        console.log(userdoc)
        if (!userdoc){
            const err = Errors.notFound()
            res.status(err.code).json(err)
        } else {
            if(userdoc.password != password || error){
                const err = Errors.unauthorized();
                res.status(err.code).json(err)
            } else {
                User.updateOne({username : user}, {$set: {password : newpassword}},(err) => {
                   if (!err){
                       res.status(200).json("password updated")
                    }else{
                        console.log(err)
                        res.status(400).json(err)
                    }
                })
            }
        }
    })
})

router.delete('/', (req, res) => {
    let user = req.body.username || ''
    let password = req.body.password || ''

    User.findOne({username : user}, function(error, userdoc){
        console.log(userdoc)
        if (!userdoc){
            const err = Errors.notFound()
            res.status(err.code).json(err)
        } else {
            if(userdoc.password != password || error){
                const err = Errors.unauthorized();
                res.status(err.code).json(err)
            } else {
                User.deleteOne({username: user}, (err) => {
                    if(!err){
                        res.status(200).json("user deleted")
                    } else {
                        console.log(err)
                        res.status(400).json(err)
                    }
                })
            }
        }
    })
})

router.get('/', (req, res) => {
    res.status(200).json("werkt")
})

module.exports = router