require('misc-commons/polyfills/string')
const { mongo } = require('../data')

module.exports = (userId, query) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(query)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.find( { email: new RegExp(query, 'i') } )
        })
        .then(userList => {
           return userList.toArray()       
    })
}

