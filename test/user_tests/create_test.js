const assert = require('assert')
const User = require('../../models/user')

describe('Creating users', () => {
    it('saves a user', (done) => {
        const user = new User({ name: 'Stijn', password: 'qwerty123' })
        user.save()
            .then(() => {
                assert(!user.isNew)
                done()
            })
    })
})