require('../utils/polyfills/string')
require('../utils/polyfills/json')
require('../utils/polyfills/number')
const { UnexistenceError } = require('../errors')
const { mongo } = require('../data')
const { ObjectId } = mongo

module.exports = (userId, productId, quantity) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(productId)
    Number.validate.positive(quantity)

    return mongo.connect()
        .then(connection => {
            const db = connection.db()

            const users = db.collection('users')

            return users.findOne({ _id: ObjectId(userId) })
        })
        .then(user => {
            if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

            const products = db.collection('products')

            return products.findOne({ _id: ObjectId(productId) })
        })
}