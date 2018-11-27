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
    let userId = '5bfd0bcc168e881e36f7dfad'

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
    Thread.findByIdAndUpdate(req.params.id, { $push: { upvotes: req.body.user }, $inc: { totalUpvotes: 1 } }, { new: true }, (err, thread) => {
        if (err) res.status(500).json(err)
        res.json(thread)
    })
})

module.exports = router