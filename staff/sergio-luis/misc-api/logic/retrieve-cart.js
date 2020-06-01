require('../utils/polyfills/string')

const {UnexistenceError} = require('../errors');

const { mongo } = require('../data')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    const cartProducts = {}
    let price = 0

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({_id: mongo.ObjectId(userId) })
                .then(user => {
                    if (!user) throw new UnexistenceError(`this ${userId} does not exist`)

                    const carts = connection.db().collection('carts')

                    return carts.findOne({user: userId})
                        .then(cart => {
                            if (!cart) throw new UnexistenceError(`cart does not exist`)
        
                            let {products} = cart

                            const productsCollection= connection.db().collection('products')
                            
                            products.forEach(product => {
                                if (cartProducts[product]) cartProducts[product] = cartProducts[product] + 1
                                else cartProducts[product] = 1
                            })
                            
                            cartProducts.price = cart.price
                            
                            return cartProducts
                        }) 
                })         
               
        })
  
}