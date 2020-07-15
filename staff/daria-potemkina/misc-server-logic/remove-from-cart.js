require('misc-commons/polyfills/string')

const { mongo } = require('misc-data')
const { ObjectId } = mongo
const { errors: { UnexistenceError } } = require('misc-commons')

module.exports = (userId, productId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(productId)

    return mongo.connect()
        .then(connection => {
            const carts = connection.db().collection('carts')

            return carts.findOne({ user: ObjectId(userId) })

                .then(cart => {
                    if (!cart || cart.length === 0) throw new UnexistenceError(`the cart is empty`)

                    return carts.updateOne({ user: userId }, { $pull: { products: productId } })
                })
        })
}