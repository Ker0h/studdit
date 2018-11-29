const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const Thread = require('../src/models/thread')
const User = require('../src/models/user')
const app = require('../src/app')

describe('COMMENTS:', () => {
    it('POST to /api/threads/:threadId/comments saves a comment', done => {
        const user = new User({ username: 'Yannick', password: 'test123' })
        const thread = new Thread({ title: 'Test7', content: 'Test7', user: user._id })

        user.save().then(() => {
            thread.save().then(() => {
                request(app)
                    .post('/api/threads/' + thread._id + '/comments')
                    .send({ content: 'Nice thread!', user: user._id })
                    .end(() => {
                        Thread.findOne({ title: 'Test7' })
                            .then(thread => {
                                assert(thread.comments.length === 1)
                                done()
                            })
                    })

            })
        })
    })

    it('DELETE to /api/threads/:threadId/comments/:id deletes a comment', done => {
        const user = new User({ username: 'Yannick', password: 'test123' })
        const comment = { content: "Delete this!", user: user._id }
        const thread = new Thread({ title: 'Test8', content: 'Test8', user: user._id })

        user.save().then(() => {
            thread.save().then(() => {
                request(app)
                    .post('/api/threads/' + thread._id + '/comments')
                    .send(comment)
                    .end(() => {
                        Thread.findOne({ title: 'Test8' })
                            .then(thread => {
                                request(app)
                                    .delete('/api/threads/' + thread._id + '/comments/' + thread.comments[0]._id)
                                    .end((err, result) => {
                                        Thread.findOne({ title: 'Test8' })
                                            .then(thread => {
                                                assert(thread.comments.length === 0)
                                                done()
                                            })

                                    })
                            })
                    })

            })
        })
    })

    it('PUT to /api/threads/:threadId/comments/:id/upvote upvotes a comment', done => {
        const user = new User({ username: 'Yannick', password: 'test123' })
        const comment = { content: "Upvote this!", user: user._id }
        const thread = new Thread({ title: 'Test16', content: 'Test16', user: user._id })
    
        user.save().then(() => {
            thread.save().then(() => {
                request(app)
                    .post('/api/threads/' + thread._id + '/comments')
                    .send(comment)
                    .end(() => {
                        Thread.findOne({ title: 'Test16' })
                            .then(thread => {
                                request(app)
                                    .put('/api/threads/' + thread._id + '/comments/' + thread.comments[0]._id + '/upvote')
                                    .send({ user: user._id })
                                    .end((err, result) => {
                                        Thread.findOne({ title: 'Test16' })
                                            .then(thread => {
                                                assert(thread.comments[0].totalUpvotes === 1)
                                                done()
                                            })

                                    })
                            })
                    })

            })
        })
    })

    it('PUT to /api/threads/:threadId/comments/:id/downvote downvotes a comment', done => {
        const user = new User({ username: 'Yannick', password: 'test123' })
        const comment = { content: "Downvote this!", user: user._id }
        const thread = new Thread({ title: 'Test17', content: 'Test17', user: user._id })
    
        user.save().then(() => {
            thread.save().then(() => {
                request(app)
                    .post('/api/threads/' + thread._id + '/comments')
                    .send(comment)
                    .end(() => {
                        Thread.findOne({ title: 'Test17' })
                            .then(thread => {
                                request(app)
                                    .put('/api/threads/' + thread._id + '/comments/' + thread.comments[0]._id + '/downvote')
                                    .send({ user: user._id })
                                    .end((err, result) => {
                                        Thread.findOne({ title: 'Test17' })
                                            .then(thread => {
                                                assert(thread.comments[0].totalDownvotes === 1)
                                                done()
                                            })

                                    })
                            })
                    })

            })
        })
    })

    it('POST to /api/threads/:threadId/comments/:id/comments comments on a comment', done => {
        const user = new User({ username: 'Yannick', password: 'test123' })
        const comment = { content: "Downvote this!", user: user._id }
        const thread = new Thread({ title: 'Test18', content: 'Test18', user: user._id })
    
        user.save().then(() => {
            thread.save().then(() => {
                request(app)
                    .post('/api/threads/' + thread._id + '/comments')
                    .send(comment)
                    .end(() => {
                        Thread.findOne({ title: 'Test18' })
                            .then(thread => {
                                request(app)
                                    .post('/api/threads/' + thread._id + '/comments/' + thread.comments[0]._id + '/comments')
                                    .send({ user: user._id, content: 'Cool comment!' })
                                    .end((err, result) => {
                                        Thread.findOne({ title: 'Test18' })
                                            .then(thread => {
                                                assert(thread.comments[0].comments[0].content === 'Cool comment!')
                                                done()
                                            })

                                    })
                            })
                    })

            })
        })
    })
})