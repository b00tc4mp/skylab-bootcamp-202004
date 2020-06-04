require('misc-commons/polyfills/string')
const { mongo } = require('misc-data')

const { ObjectId } = mongo

module.exports = userId => {
    String.validate.notVoid(userId)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            debugger

            return users.findOne({ _id: ObjectId(userId) })
        })
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} does not exist`)

            delete user._id
            delete user.password

            return user
        })
}