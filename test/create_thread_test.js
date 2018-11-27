const assert = require('assert')
const Thread = require('../src/models/thread')
const User = require('../src/models/user')

let user

describe('Creating threads', () => {
    before((done) => {
        user = new User({ username: 'ker0h', password: 'test123' })
        done()
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