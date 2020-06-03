require('misc-commons/polyfills/string')

const { mongo } = require('misc-data')
const { ObjectId } = mongo
const { errors: { UnexistenceError } } = require('misc-commons')

module.exports = userId => {
    String.validate.notVoid(userId)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({ _id: ObjectId(userId) })
        })
        .then(user => {
            if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

            const { cart = [] } = user

            if (cart.length === 0) throw new UnexistenceError(`cart does not exist`)

            return cart
        })
}