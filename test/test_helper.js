const mongoose = require('mongoose')

mongoose.Promise = global.Promise

before((done) => {
    mongoose.connect('mongodb://localhost/studdit')
    mongoose.connection
        .once('open', () => {
            done()
        })
        .on('error', (error) => {
            console.warn('Warning:', error)
        })
})

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done()
    })
})