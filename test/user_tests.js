const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const User = mongoose.model('user')

describe('Creating a user', () => {
    it('saves a user', (done) => {
        let user = new User({ username: 'Stijn', password: 'qwerty123' })
        user.save()
            .then(() => {
                assert(!user.isNew)
                done()
            }).catch((err) => {
                done(err)
            })
    })

    describe('Updating a user', () => {
        beforeEach((done) => {
            let user = new User({ username: 'Stijn', password: 'qwerty123' })
            user.save()
                .then(() => {
                    assert(!user.isNew)
                    done()
                }).catch((err) => {
                    done(err)
                })
        })

        it('updates the password', (done) => {

        })

        it('deletes a user', (done) => {

        })
    })
})