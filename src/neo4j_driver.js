var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://hobby-kpdkodfghkjagbkeeblebfbl.dbs.graphenedb.com:24786",
    neo4j.auth.basic("ker0h", "b.py8nv1koOg8B.QkeGFQhL2h2oDjhP"));

// var session = driver.session();
// session
//     .run("CREATE (n:Person {name:'Bob'}) RETURN n.name")
//     .then(function (result) {
//         result.records.forEach(function (record) {
//             console.log(record)
//         });

//         session.close();
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
class neo4j {

    static addUser(name) {
        var session = driver.session();
    session
        .run('CREATE (a:User {name: $name})', {'name': name})
        .then(function (result) {
            result.records.forEach(function (record) {
                console.log(record)
            });
            session.close();
        })
        .catch(function (error) {
            console.log(error);
        });
    }


static addFriend() {
    var session = driver.session();
session
    .run("")
    .then(function (result) {
        result.records.forEach(function (record) {
            console.log(record)
        });

        session.close();
    })
    .catch(function (error) {
        console.log(error);
    });
}
}

module.exports = neo4j