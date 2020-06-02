require('misc-commons/polyfills/string')
require('misc-commons/polyfills/json')
require('misc-commons/polyfills/number')
const { errors: { UnexistenceError } } = require('misc-commons')
const { mongo } = require('misc-data')
const { ObjectId } = mongo

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')
            const orders = connection.db().collection('orders')

            return users.findOne({ _id: ObjectId(userId) })
                .then(user => {
                    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

                    const order = {order: user.cart}
                    delete user.cart

                    return orders.insertOne(order)
                })
                .then(() => { })
        })
}