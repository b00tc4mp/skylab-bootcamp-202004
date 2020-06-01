require('../utils/polyfills/string')
const { mongo } = require('../data')
const { UnexistenceError } = require('../errors')
const { ObjectId} = mongo

module.exports = (userId, productId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(productId)

    let carts
    let products

    return mongo.connect()
        .then(connection => {
            carts = connection.db().collection('carts')
            products = connection.db().collection('products')

            return products.findOne({ _id: ObjectId(productId) })
        })
        
        .then(product => {
            if (!product) throw new UnexistenceError(`Product with ID ${productId} does not exist.`)

            else return carts.findOne( { userId })
        })

        .then(cart => {
            if (!cart) return carts.insertOne({ products: [productId], userId })

            else return carts.updateOne({ userId }, { $push: { products: productId } })
        })
} 