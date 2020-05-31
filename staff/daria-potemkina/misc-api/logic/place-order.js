require('../utils/polyfills/string')
const { mongo } = require('../data')
const { ObjectId } = mongo
const { UnexistenceError } = require('../errors')



module.exports = userId => {
    String.validate.notVoid(userId)

    return mongo.connect()
        .then(connection => {
            const carts = connection.db().collection('carts')
            const product = connection.db().collection('products')
            const orders = connection.db().collection('orders')

            let price = 0
            let count = 0

            return carts.findOne({ user: userId })
                .then(cart => {
                    if (!cart) throw new UnexistenceError(`cart is not exists`)

                    const { products, _id } = cart

                    products.forEach(item => {
                        return product.findOne({ _id: ObjectId(item) })
                            .then(_product => {
                                price += _product.price
                                count++

                                if (count === products.length) {
                                    return orders.insertOne({ user: userId, products, price })
                                    .then(() => {
                                        return carts.deleteOne({_id})
                                    })
                                }
                            })
                    })
                })
        })
}