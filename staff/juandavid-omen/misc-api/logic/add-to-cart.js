require('../utils/polyfills/string')
const { mongo } = require('../data')

module.exports = (userId, productId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(productId)

    let carts

    return mongo.connect()
        .then(connection => {
            carts = connection.db().collection('carts')

            return carts.findOne({ userId })
        })

        .then(cart => {
            if (!cart) return carts.insertOne({ products: [productId], userId })

            else {
                return carts.updateOne({ userId }, { $push: { products: productId } })
            }
        })
} 