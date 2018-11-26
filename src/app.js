const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'))

//Mongoose
mongoose.Promise = global.Promise

if (process.env.NODE_ENV == "testCloud" || process.env.NODE_ENV == "production") {
    mongoose.connect('mongodb+srv://ker0h:Qwerty_123@studdit-mongo-cgart.mongodb.net/test?retryWrites=true',
        { useNewUrlParser: true })
} else {
    mongoose.connect('mongodb://localhost/users_test')
}

app.listen(port, () => {
    console.log('Listening on port ' + port)
})