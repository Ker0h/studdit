const express = require('express')
const router = express.Router({})
const Thread = require('./../models/thread')
const Errors = require('./../errorHandling/errorcodes')

/*
* CREATE THREAD
*/
router.post('/', (req, res) => {
    let title = req.body.title || ''
    let content = req.body.content || ''
    let userId = req.body.user || ''

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
})

/*
* GET ALL THREADS
*/
router.get('/', (req, res) => {
    Thread.find({}, { comments: 0, __v: 0 }, (err, threads) => {
        if (err) res.status(500).json(err)
        res.status(200).json(threads)
    })
})

/*
* GET THREAD BY ID
*/
router.get('/:id', (req, res) => {
    Thread.findById(req.params.id, { __v: 0 }, (err, thread) => {
            if (err) res.status(500).json(err)
            res.status(200).json(thread)
        })
})

/*
* UPDATE CONTENT
*/
router.put('/:id', (req, res) => {
    Thread.findByIdAndUpdate(req.params.id, { content: req.body.content }, { new: true }, (err, thread) => {
        if (err) res.status(500).json(err)
        res.json(thread)
    })
})

/*
* DELETE THREAD
*/
router.delete('/:id', (req, res) => {
    Thread.findByIdAndDelete(req.params.id, (err, thread) => {
        if (err) res.status(500).json(err)
        res.json('Thread deleted:' + thread._id)
    })
})

/*
* UPVOTE THREAD
*/
router.put('/:id/upvote', (req, res) => {
    Thread.findById(req.params.id, (err, thread) => {
        if (err) res.status(500).json(err)

        let user = req.body.user

        if(thread.downvotes.indexOf(user) >= 0) {
            thread.downvotes.remove(user)
            thread.totalDownvotes--
        }

        if(thread.upvotes.indexOf(user) >= 0) {
            console.log('User already upvoted')
        }else{
            thread.upvotes.push(user)
            thread.totalUpvotes++
        }

        thread.save()
            .then(() => res.json(thread))
    })
})

/*
* DOWNVOTE THREAD
*/

router.put('/:id/downvote', (req, res) => {
    Thread.findById(req.params.id, (err, thread) => {
        if (err) res.status(500).json(err)

        let user = req.body.user

        if(thread.upvotes.indexOf(user) >= 0) {
            thread.upvotes.remove(user)
            thread.totalUpvotes--
        }

        if(thread.downvotes.indexOf(user) >= 0) {
            console.log('user already downvoted')
        }else{
            thread.downvotes.push(user)
            thread.totalDownvotes++
        }

        thread.save()
            .then(() => res.json(thread))
    })
})

module.exports = router