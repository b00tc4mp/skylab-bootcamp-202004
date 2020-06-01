require('../utils/polyfills/string')
const { mongo } = require('../data')
const { ObjectId } = mongo
const { TypeError } = require('../errors')

module.exports = (userId, productId) => {


    return mongo.connect()
        .then(connection => {
            const carts = connection.db().collection('cart')

            return carts.findOne({ userId })
            
                .then(cart => {
                    if (!cart) {
                        return carts.insertOne({
                            products: [productId],
                            userId: userId
                        })
                    }
                    return carts.updateOne({ userId }, { $push: { products: productId } })
                })
        })
        .then(() => "Product has been added to cart correctly")

}