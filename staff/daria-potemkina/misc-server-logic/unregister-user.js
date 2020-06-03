require('misc-commons/polyfills/string')
const { mongo } = require('misc-data')
const { ObjectId } = mongo
const { errors: { UnexistenceError } } = require('misc-commons')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({ _id: ObjectId(userId) })

                .then(user => {
                    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

                    return users.deleteOne({ _id: ObjectId(userId) })
                })
        })
}
