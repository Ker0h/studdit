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
                                console.log('COMMENT ID: ' + thread.comments[0]._id)
                                console.log('CURRENT COMMENTS: ' + thread.comments.length)
                                request(app)
                                    .delete('/api/threads/' + thread._id + '/comments/' + thread.comments[0]._id)
                                    .end((err, result) => {
                                        console.log('CURRENT COMMENTS IN TEST: ' + thread.comments.length)
                                        assert(thread.comments.length === 0)
                                        done()
                                    })
                            })
                    })

            })
        })
    })
})