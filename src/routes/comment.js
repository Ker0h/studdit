const express = require('express')
const router = express.Router({ mergeParams: true })
const Thread = require('./../models/thread')
const Comment = require('../models/comment.schema')
const Errors = require('./../errorHandling/errorcodes')

/*
* CREATE COMMENT
*/
router.post('/', (req, res) => {
    Thread.findById(req.params.threadId, (err, thread) => {
        if (err) res.status(500).json(err)

        const comment = {
            content: req.body.content,
            user: req.body.user,
            thread: req.params.threadId
        }

        thread.comments.push(comment)

        thread.save()
            .then((thread) => {
                res.status(200).json(thread)
            })
            .catch((err) => res.status(400).json(err))
    })
})

/*
* GET ALL COMMENTS
*/
router.get('/', (req, res) => {
    Thread.findById(req.params.threadId, { __v: 0 }, (err, thread) => {
        if (err) res.status(500).json(err)
        res.status(200).json(thread.comments)
    })
})

/*
* GET COMMENT BY ID
*/
router.get('/:id', (req, res) => {
    Thread.findById(req.params.threadId, (err, thread) => {
        if (err) res.status(500).json(err)
        res.status(200).json(thread.comments.id(req.params.id))
    })
})

/*
* ADD COMMENT TO ANOTHER COMMENT (UPDATE COMMENT)
*/
router.post('/:id', (req, res) => {
    Thread.findById(req.params.threadId, { __v: 0 }, (err, thread) => {
        if (err) res.status(500).json(err)

        const comment = thread.comments.id(req.params.id)

        const subComment = {
            content: req.body.content,
            user: req.body.user,
            thread: req.params.threadId
        }

        comment.comments.push(subComment)

        thread.save()
            .then((thread) => {
                res.status(200).json(thread)
            })
            .catch((err) => res.status(400).json(err))
    })
})

/*
* DELETE COMMENT
*/
router.delete('/:id', (req, res) => {
    Thread.findById(req.params.threadId, { __v: 0 }, (err, thread) => {
        if (err) res.status(500).json(err)

        const comment = thread.comments.id(req.params.id)

        thread.comments.remove(comment)

        thread.save()
            .then((thread) => {
                res.status(200).json(thread)
            })
            .catch((err) => res.status(400).json(err))
    })
})

/*
* UPVOTE COMMENT
*/
router.put('/:id/upvote', (req, res) => {
    Thread.findById(req.params.threadId, (err, thread) => {
        if (err) res.status(500).json(err)

        const comment = thread.comments.id(req.params.id)

        let user = req.body.user

        if(comment.downvotes.indexOf(user) >= 0) {
            comment.downvotes.remove(user)
            comment.totalDownvotes--
        }

        if(comment.upvotes.indexOf(user) >= 0) {
            console.log('User already upvoted')
        }else{
            comment.upvotes.push(user)
            comment.totalUpvotes++
        }

        thread.save()
            .then(() => res.json(thread))
    })
})

/*
* DOWNVOTE THREAD
*/
router.put('/:id/downvote', (req, res) => {
    Thread.findById(req.params.threadId, (err, thread) => {
        if (err) res.status(500).json(err)

        const comment = thread.comments.id(req.params.id)

        let user = req.body.user

        if(comment.upvotes.indexOf(user) >= 0) {
            comment.upvotes.remove(user)
            comment.totalUpvotes--
        }

        if(comment.downvotes.indexOf(user) >= 0) {
            console.log('User already downvoted')
        }else{
            comment.downvotes.push(user)
            comment.totalDownvotes++
        }

        thread.save()
            .then(() => res.json(thread))
    })
})

module.exports = router