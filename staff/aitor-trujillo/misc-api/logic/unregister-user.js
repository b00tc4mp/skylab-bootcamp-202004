require('../utils/polyfills/string')
require('../utils/polyfills/json')
const { CredentialsError } = require('../errors')
const { mongo } = require('../data')
const { ObjectId } = mongo

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.deleteOne({ _id: ObjectId(userId) })
        })
}