const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const User = require('../src/models/user')
const app = require('../src/app')

describe('USERS:', () => {
    it('POST to /api/user saves a user', done => {
        User.count().then(count => {
            request(app)
                .post('/api/user')
                .send({ username: 'Stijn', password: 'qwerty123' })
                .end(() => {
                    User.count().then(newCount => {
                        assert(count + 1 === newCount)
                        done()
                    })
                })
        })
    })


    it('PUT to /api/user edits the password of an existing user', done => {
        const user = new User({ username: 'Yannick', password: 'test123' })

        user.save().then(() => {
            request(app)
                .put('/api/user')
                .send({ username: 'Yannick', password: 'test123', newpassword: 'qwerty123' })
                .end(() => {
                    User.findOne({ username: 'Yannick' })
                        .then(user => {
                            assert(user.password === 'qwerty123')
                            done()
                        })
                })
        })
    })

    it('DELETE to /api/user deletes a user', (done) => {
        const user = new User({ username: 'Piet', password: 'test123' })

        user.save().then(() => {
            request(app)
                .delete('/api/user')
                .send({ username: 'Piet', password: 'test123' })
                .end(() => {
                    User.findOne({ username: 'Piet' })
                        .then((user) => {
                            assert(user === null)
                            done()
                        })
                })
        })
    })
})