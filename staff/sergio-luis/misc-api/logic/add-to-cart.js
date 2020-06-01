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
                                if (!cart) {
                                    return carts.insertOne({user: userId,products: [productId], price: Number(product.price)})
                                    .then(()=> carts.findOne({ user: userId }))  
                                    .then(_cart => _cart._id.toString())
                                } else {
                                    return carts.updateOne({ user: userId }, {$push: { products: { $each: [productId] } }, $set : { price: cart.price + Number(product.price)}})
                                }
                            })
                            
                    })
                
            })

        })
    
}

