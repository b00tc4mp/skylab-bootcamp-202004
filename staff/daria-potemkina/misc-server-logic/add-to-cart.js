require('misc-commons/polyfills/string')

const { mongo } = require('misc-data')
const { ObjectId } = mongo
const { errors: { UnexistenceError } } = require('misc-commons')

module.exports = (userId, productId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(productId)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')
            const carts = connection.db().collection('carts')

            return users.findOne({ _id: ObjectId(userId) })

                .then(user => {
                    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

                    return carts.findOne({ user: userId })

                        .then(cart => {
                            if (!cart)
                                return carts.insertOne({ user: userId, products: [productId] })
                            else
                                return carts.updateOne({ user: userId }, { $addToSet: { products: productId } })
                        })
                })
        })
}