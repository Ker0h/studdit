const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/studdit')

mongoose.connection
    .once('open', () => console.log('Connected to studdit...'))
    .on('error', (error) => {
        console.warn('Warning:', error)
    })