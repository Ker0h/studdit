const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const Thread = require('../src/models/thread')
const User = require('../src/models/user')
const app = require('../src/app')

describe('THREADS:', () => {
    it('POST to /api/threads saves a thread', done => {
        const user = new User({ username: 'Yannick', password: 'test123' })

        user.save().then(() => {
            Thread.count().then(count => {
                request(app)
                    .post('/api/threads')
                    .send({ title: 'Test', content: 'A supercool thread!', user: user._id })
                    .end(() => {
                        Thread.count().then(newCount => {
                            assert(count + 1 === newCount)
                            done()
                        })
                    })
            })
        })
    })
})


it('PUT to /api/threads/:id edits the content of an existing thread', done => {
    const user = new User({ username: 'Yannick', password: 'test123' })
    const thread = new Thread({ title: 'Test2', content: 'Old stuff', user: user._id })

    user.save().then(() => {
        thread.save().then(() => {
            request(app)
                .put('/api/threads/' + thread.id)
                .send({ content: 'Updated' })
                .end(() => {
                    Thread.findOne({ title: 'Test2' })
                        .then((thread) => {
                            assert(thread.content === 'Updated')
                            done()
                        })
                })
        })
    })
})

it('DELETE to /api/threads/:id deletes an existing thread', done => {
    const user = new User({ username: 'Yannick', password: 'test123' })
    const thread = new Thread({ title: 'Test3', content: 'Old stuff', user: user._id })

    user.save().then(() => {
        thread.save().then(() => {
            request(app)
                .delete('/api/threads/' + thread.id)
                .end(() => {
                    Thread.findOne({ title: 'Test3' })
                        .then((thread) => {
                            assert(thread === null)
                            done()
                        })
                })
        })
    })
})

it('GET to /api/threads gets all threads', done => {
    const user = new User({ username: 'Yannick', password: 'test123' })
    const thread1 = new Thread({ title: 'Test4', content: 'Test4', user: user._id })
    const thread2 = new Thread({ title: 'Test5', content: 'Test5', user: user._id })


    user.save().then(() => {
        thread1.save().then(() => {
            thread2.save().then(() => {
                request(app)
                    .get('/api/threads')
                    .end((err, result) => {
                        assert(result.body.length === 2)
                        done()
                    })
            })
        })
    })
})

it('GET to /api/thread/:id gets thread by id', done => {
    const user = new User({ username: 'Yannick', password: 'test123' })
    const thread = new Thread({ title: 'Test6', content: 'Test6', user: user._id })


    user.save().then(() => {
        thread.save().then(() => {
            request(app)
                .get('/api/threads/' + thread._id)
                .end((err, result) => {
                    assert(result.body.title === 'Test6')
                    done()
                })
        })
    })
})
