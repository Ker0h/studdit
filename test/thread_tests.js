const assert = require('assert')
const Thread = require('../src/models/thread')
const User = require('../src/models/user')

let user

describe('Creating threads', () => {
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

    it('saves a thread', (done) => {
        const thread = new Thread({ title: 'Test', content: 'This is a supercool thread!', 
            user: user._id, upvotes: [], downvotes: [], comments: []})
        thread.save()
            .then(() => {
                assert(!thread.isNew)
                done()
            }).catch((err) => {
                done(err)
            })
    })
})