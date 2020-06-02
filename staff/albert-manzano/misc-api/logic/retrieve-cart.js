require('../utils/polyfills/string')
const { mongo } = require('../data')
const { ObjectId } = mongo

module.exports = userId => {
    String.validate.notVoid(userId)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            debugger

            return users.findOne({ _id: ObjectId(userId) })
        })
        .then(cart => {
            const { cart } = user
            if (!cart) throw new Error(`cart with id ${userId} does not exist`)
            return cart
        })
}