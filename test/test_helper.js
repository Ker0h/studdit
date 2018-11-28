const mongoose = require('mongoose')

before((done) => {
    mongoose.Promise = global.Promise

    if (process.env.NODE_ENV == "testCloud" || process.env.NODE_ENV == "production") {
        mongoose.connect('mongodb+srv://ker0h:Qwerty_123@studdit-mongo-cgart.mongodb.net/test?retryWrites=true',
            { useNewUrlParser: true })
    } else {
        mongoose.connect('mongodb://localhost/studdit_test')
    }
    mongoose.connection
        .once('open', () => {
            done()
        })
        .on('error', (error) => {
            console.warn('Warning:', error)
        })
})

beforeEach((done) => {
        mongoose.connection.collections.threads.drop((err, doc) => {
            mongoose.connection.collections.users.drop((err, doc) => {
                done(err)
            })
        })
})