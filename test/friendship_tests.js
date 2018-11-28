const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const User = require('../src/models/user')
const app = require('../src/app')

describe('FRIENDSHIP:', () => {
    it('POST to api/friend creates a new relationship between two users', done => {
        const user1 = new User({ username: 'Yannick', password: 'test123' })
        const user2 = new User({ username: 'Stijn', password: 'qwerty123' })

        user1.save().then(() => {
            user2.save().then(() => {
                request(app)
                    .post('/api/friend')
                    .send({ user1: user1.username, user2: user2.username })
                    .end((err, result) => {
                        assert(result.ok === true)
                        done()
                    })
            })
        })
    })

    it('DELETE to api/friend removes a relationship between two users', done => {
        const user1 = new User({ username: 'Henk', password: 'test123' })
        const user2 = new User({ username: 'Piet', password: 'qwerty123' })

        user1.save().then(() => {
            user2.save().then(() => {
                request(app)
                    .post('/api/friend')
                    .send({ user1: user1.username, user2: user2.username })
                    .end(() => {
                        request(app)
                            .delete('/api/friend')
                            .send({ user1: user1.username, user2: user2.username })
                            .end((err, result) => {
                                assert(result.ok === true)
                                done()
                            })
                    })
            })
        })
    })
})