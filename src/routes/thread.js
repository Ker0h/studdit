const express = require('express')
const router = express.Router({})
const Thread = require('./../models/thread')
const Errors = require('./../errorHandling/errorcodes')
const User = require('./../models/user')

/*
* CREATE THREAD
*/
router.post('/', (req, res) => {
    let title = req.body.title || ''
    let content = req.body.content || ''
    let userId = req.body.user || ''


    User.findOne({ _id: userId }, function (error, userdoc) {
        if (!userdoc || error) {
            const err = Errors.UnprocessableEntity()
            res.status(err.code).json(err)
        } else {
            const thread = new Thread({
                title: title,
                content: content,
                user: userId
            })

            thread.save()
                .then((thread) => {
                    res.status(200).json(thread)
                })
                .catch((err) => res.status(400).json(err))
        }
    })

})



/*
* UPDATE CONTENT
*/
router.put('/:id', (req, res) => {
    let id = req.params.id || ''
    let content = req.body.content || ''

    Thread.findByIdAndUpdate(id, { content: content }, { new: true }, (error, thread) => {
        if (!thread || error) {
            const err = Errors.UnprocessableEntity()
            res.status(err.code).json(err)
        }
        res.status(200).json(thread)
    })
})

/*
* DELETE THREAD
*/
router.delete('/:id', (req, res) => {
    let id = req.params.id || ''
    Thread.findByIdAndDelete(id, (error, thread) => {
        if (!thread || error) {
            const err = Errors.UnprocessableEntity()
            res.status(err.code).json(err)
        }
        res.json('Thread deleted:' + thread._id)
    })
})

/*
* UPVOTE THREAD
*/
router.put('/:id/upvote', (req, res) => {
    let id = req.params.id || ''
    Thread.findById(id, (error, thread) => {
        if (!thread || error) {
            const err = Errors.UnprocessableEntity()
            res.status(err.code).json(err)
        } else {

            let user = req.body.user

            User.findById(user, function (error, userdoc) {
                if (!userdoc || error) {
                    const err = Errors.UnprocessableEntity()
                    res.status(err.code).json(err)
                } else {
                    if (thread.downvotes.indexOf(user) >= 0) {
                        thread.downvotes.remove(user)
                        thread.totalDownvotes--
                    }

                    if (thread.upvotes.indexOf(user) >= 0) {
                        console.log('User already upvoted')
                    } else {
                        thread.upvotes.push(user)
                        thread.totalUpvotes++
                    }
                    thread.save().then(() => res.json(thread))
                }
            })
        }
    })
})

/*
* DOWNVOTE THREAD
*/

router.put('/:id/downvote', (req, res) => {
    let id = req.params.id || ''
    Thread.findById(id, (error, thread) => {
        if (!thread || error) {
            const err = Errors.UnprocessableEntity()
            res.status(err.code).json(err)
        } else {

            let user = req.body.user

            User.findById(user, function (error, userdoc) {
                if (!userdoc || error) {
                    const err = Errors.UnprocessableEntity()
                    res.status(err.code).json(err)
                } else {

                    if (thread.upvotes.indexOf(user) >= 0) {
                        thread.upvotes.remove(user)
                        thread.totalUpvotes--
                    }

                    if (thread.downvotes.indexOf(user) >= 0) {
                        console.log('user already downvoted')
                    } else {
                        thread.downvotes.push(user)
                        thread.totalDownvotes++
                    }

                    thread.save()
                        .then(() => res.json(thread))
                }
            })
        }
    })
})

/*
* SORT THREADS BY UPVOTES
*/
router.get('/up', (req, res) => {
    Thread.find({}, { comments: 0, __v: 0 }, (error, threads) => {
        if (error){
            res.status(500).json(err)
        } else {

            threads.sort(function(a, b){
                return b.totalUpvotes - a.totalUpvotes
            })
            res.status(200).json(threads)
        }
    })
})


/*
* SORT THREADS BY DIFFERENCE IN UP/DOWNVOTES
*/
router.get('/diff', (req, res) => {
    Thread.find({}, { comments: 0, __v: 0 }, (error, threads) => {
        if (error){
            res.status(500).json(err)
        } else {

            threads.sort(function(a, b){
                return (b.totalUpvotes- b.totalDownvotes) - (a.totalUpvotes - a.totalDownvotes)
            })
            res.status(200).json(threads)
        }
    })
})

/*
* GET ALL THREADS
*/
router.get('/', (req, res) => {
    Thread.find({}, { comments: 0, __v: 0 }, (error, threads) => {
        if (error) {
            res.status(500).json(err)
        } else {
            res.status(200).json(threads)
        }
    })
})

/*
* GET THREAD BY ID
*/
router.get('/:id', (req, res) => {
    let id = req.params.id || ''

    Thread.findById(id, { __v: 0 }, (error, thread) => {
        if (!thread || error) {
            const err = Errors.UnprocessableEntity()
            res.status(err.code).json(err)
        }
        res.status(200).json(thread)
    })
})



module.exports = router