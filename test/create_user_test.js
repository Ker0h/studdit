const assert = require('assert')
const User = require('../src/models/user')

describe('Creating users', () => {
    it('saves a user', (done) => {
        const user = new User({ username: 'Stijn', password: 'qwerty123' })
        user.save()
            .then(() => {
                assert(!user.isNew)
                done()
            }).catch((err) => {
                done(err)
            })
    })
})