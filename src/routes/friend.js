const express = require('express')
const router = express.Router({})
const User = require('../models/user')
const Errors = require('../errorHandling/errorcodes')

var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://hobby-kpdkodfghkjagbkeeblebfbl.dbs.graphenedb.com:24786",
    neo4j.auth.basic("ker0h", "b.py8nv1koOg8B.QkeGFQhL2h2oDjhP"));




router.post('/', (req, res) => {
    let user1 = req.body.user1 || ''
    let user2 = req.body.user2 || ''

    if (user1 && user2) {
        User.findOne({ username: user1 }, function (error, userdoc) {
            if (!userdoc) {
                const err = Errors.notFound()
                res.status(err.code).json(err)
            } else {
                User.findOne({ username: user2 }, function (error, userdoc) {
                    if (!userdoc) {
                        const err = Errors.notFound()
                        res.status(err.code).json(err)
                    } else {
                        var session = driver.session();
                        session
                            .run('MATCH (a:User {user: $user1}) ' +
                                'MATCH (b:User {user: $user2}) ' +
                                'MERGE (a)-[:IS_FIREND_WITH]-(b)', { 'user1': user1, 'user2': user2 })
                            .then(function (result) {
                                result.records.forEach(function (record) {
                                    console.log(record)
                                });
                                session.close();
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        res.status(200).json("friends added")
                    }
                })
            }
        })
    }
})


router.delete('/', (req, res) => {
    let user1 = req.body.user1 || ''
    let user2 = req.body.user2 || ''

    if (user1 && user2) {
        User.findOne({ username: user1 }, function (error, userdoc) {
            if (!userdoc) {
                const err = Errors.notFound()
                res.status(err.code).json(err)
            } else {
                User.findOne({ username: user2 }, function (error, userdoc) {
                    if (!userdoc) {
                        const err = Errors.notFound()
                        res.status(err.code).json(err)
                    } else {
                        var session = driver.session();
                        session
                            .run('MATCH (a:User {user: $user1}) '
                                +'MATCH (b:User {user: $user2}) ' 
                                +'MATCH (a)-[r]-(b) '
                                +'DELETE r', { 'user1': user1, 'user2': user2 })
                            .then(function (result) {
                                result.records.forEach(function (record) {
                                    console.log(record)
                                });
                                session.close();
                                console.log(result)
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        res.status(200).json("friends deleted")
                    }
                })
            }
        })
    }
})
module.exports = router