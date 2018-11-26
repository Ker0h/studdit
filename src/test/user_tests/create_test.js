const assert = require('assert')
const User = require('../../models/user')

describe('Creating users', () => {
    it('saves a user', () => {
        const user = new User({ name: 'Stijn', password: 'qwerty123'})
    })
})