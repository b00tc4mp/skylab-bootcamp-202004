require('../utils/polyfills/string')
const { mongo } = require('../../misc-data/data')
const { ObjectId } = mongo
const { UnexistenceError } = require('../errors')

module.exports = userId => {
    String.validate.notVoid(userId)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')
            const products = connection.db().collection('products')
            const orders = connection.db().collection('orders')

            let price = 0

            return users.findOne({ _id: ObjectId(userId) })
                .then(user => {
                    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

                    const { cart = [] } = user

                    if (cart.length === 0 ) throw new UnexistenceError(`cart is empty`)
        
                       const results = cart.map(({ product, quantity}) => {
                            return products.findOne({ _id: product })
                                .then(_product => {
                                    if(!_product) throw new UnexistenceError(`product with id ${product} does not exist`)
                                    
                                    price += _product.price*quantity
                                    return price
                                })
                            })
 
                    return Promise.all(results)
                        .then(result => orders.insertOne({user: userId, price: result[result.length - 1], cart, date: new Date()}))
                        .then(() => users.updateOne({_id: ObjectId(userId)}, { $set : { cart : [] } }))
                })
                
        })
        .then(() => { })
}
