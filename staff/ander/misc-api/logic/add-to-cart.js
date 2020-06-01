require('../utils/polyfills/string')
const { mongo } = require('../data')

module.exports = ({ userId,productId}) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(productId)

    let carts

    return mongo.connect()
        .then(connection => {
            const carts = connection.db().collection('carts')

            return carts.findOne({userId})
        })

        .then(cart => {
            if(!cart) carts.insertOne({products: [productId]}, userId )

            else cart.products.push(productId)

            return cart._id.toString()
        })
}