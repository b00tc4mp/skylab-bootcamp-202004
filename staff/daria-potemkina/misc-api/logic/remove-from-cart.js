require('../utils/polyfills/string')

const { mongo } = require ('../data')
const { ObjectId} = mongo
const { UnexistenceError } = require('../errors')

module.exports = (userId, productId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(productId)

    return mongo.connect()
        .then(connection => {
            const carts = connection.db().collection('carts')

            return carts.findOne({user: userId})

            .then(cart => {
                if (!cart || cart.length === 0) throw new UnexistenceError(`the cart is empty`)

                return carts.updateOne({user: userId}, {$pull: {products: productId}})
            })
        })
}