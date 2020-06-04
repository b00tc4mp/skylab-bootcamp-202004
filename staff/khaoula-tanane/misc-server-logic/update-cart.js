require('misc-commons/polyfills/string')
require('misc-commons/polyfills/json')
require('misc-commons/polyfills/number')
const { errors: { UnexistenceError } } = require('misc-commons')
const { mongo } = require('misc-data')
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
                .then(user => {
                    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

                    const products = db.collection('products')

                    return products.findOne({ _id: ObjectId(productId) })
                        .then(product => {
                            if (!product) throw new UnexistenceError(`product with id ${productId} does not exist`)

                            const { cart = [] } = user

                            const index = cart.findIndex(item => item.product.toString() === productId)

                            if (quantity === 0) {
                                if (index < 0) throw new UnexistenceError(`product with id ${productId} does not exist in cart for user with id ${userId}`)

                                cart.splice(index, 1)
                            } else {
                                let product

                                if (index < 0) {
                                    product = { product: ObjectId(productId) }

                                    cart.push(product)
                                } else product = cart[index]

                                product.quantity = quantity
                            }

                            return users.updateOne({ _id: ObjectId(userId) }, { $set: { cart } })
                        })
                })
                .then(() => { })
        })
}