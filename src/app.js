const express = require('express')
const expressJWT = require('express-jwt')
const app = express()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const api = require('./routes/api.js')
const errors = require('./errorHandling/errorcodes')
const config = require('../config')
const port = process.env.PORT || 3000
const env = process.env.NODE_ENV;

//Mongoose
mongoose.Promise = global.Promise

if (env == 'testCloud' || env == "production") {
    mongoose.connect('mongodb+srv://ker0h:Qwerty_123@studdit-mongo-cgart.mongodb.net/test?retryWrites=true',
        { useNewUrlParser: true })
} else {
    //mongoose.connect('mongodb://localhost/users_test')
    mongoose.connect('mongodb+srv://ker0h:Qwerty_123@studdit-mongo-cgart.mongodb.net/test?retryWrites=true',
        { useNewUrlParser: true })
    console.log('connected localy')
}
mongoose.connection
.once('open', () => {
    console.log("connected, connection is open")
})
.on('error', (error) => {
    console.warn('Warning:', error)
})


//Routing
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// app.use(expressJWT({
//     secret: config.secretkey
// }).unless({
//     //path: ['/api/login', '/api/register']
// }), (function(err, req, res, next){
//     if(err.name === 'UnauthorizedError'){
//         const err = errors.unauthorized()
//         res.status(err.code).json(err)
//     }
// }));

app.use('/api', api)

// app.all('*', (req, res) => {
//     const error = Errors.badRequest();
//     res.status(error.code).json(error);
// });

app.listen(port, () => {
    console.log('Listening on port ' + port)
})

module.exports = app