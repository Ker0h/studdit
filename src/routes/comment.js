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
            user: '5bfd0bcc168e881e36f7dfad',
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
            user: '5bfd0bcc168e881e36f7dfad',
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
    Thread.findByIdAndUpdate(req.params.id, { $push: { upvotes: req.body.user }, $inc: { totalUpvotes: 1 } }, { new: true }, (err, thread) => {
        if (err) res.status(500).json(err)
        res.json(thread)
    })
})

module.exports = router