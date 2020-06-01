const { mongo } = require('../data')
require('../utils/polyfills/string')
const { UnexistenceError } = require('../errors')


module.exports = (userId, productId) => {
String.validate.notVoid(userId)
String.validate.notVoid(productId)

return mongo.connect()
    .then(connection => {
        const users = connection.db().collection('users')

        return users.findOne({ _id: mongo.ObjectId(userId) })
        .then(user => {
            if (!user) throw new UnexistenceError(`this user does not exist`)

            const products = connection.db().collection('products')

            return products.findOne({ _id: mongo.ObjectId(productId) })// catch dont work!!!!
                .then(product => {
                    if (!product) throw new UnexistenceError(`this product does not exist`)

                    const carts = connection.db().collection('carts')

                    return carts.findOne({ user: userId })
                        .then(cart => {
                            if (!cart) throw new UnexistenceError(`cart does not exist`)
                            debugger
                            const {products: __products} = cart

                            const index = __products.indexOf(productId)

                            if (index < 0) throw new UnexistenceError(`this product does not exist inside this cart`)

                            __products.splice(index, 1)

                            return carts.updateOne({ user: userId }, {$set: {products: __products, price: cart.price-Number(product.price)}})
                    
                        })
                })
                
        })

    })
    
}
