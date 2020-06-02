require('../utils/polyfills/string')

const {UnexistenceError, CredentialsError} = require('../errors');

const { mongo } = require('../data')

module.exports = (userId, cartId)=>{
    String.validate.notVoid(userId)
    String.validate.notVoid(cartId)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({_id: mongo.ObjectId(userId) })
                .then(user => {
                    if (!user) throw new UnexistenceError(`this ${userId} does not exist`)

                    const carts = connection.db().collection('carts')

                    return carts.findOne({user: userId})
                        .then(cart => {
                            debugger
                            if (!cart) throw new UnexistenceError(`cart does not exist`)

                            if (cart._id.toString() !== cartId) throw new CredentialsError(`cart with this cart id does not exist`)

                            delete cart.user
                            delete cart._id

                            let date = new Date()
                            cart.date = date.toISOString()

                            const orders = connection.db().collection('orders')
                            // add to histoy
                            return orders.findOne({user: userId})
                                .then(order => {
                                    if (!order) {
                                        return orders.insertOne({'history': [cart], 'user' : userId})
                                    }
                                    else {
                                        return orders.updateOne({user: userId},{
                                            $push : {'history': { $each: [cart] } }
                                        })
                                    }
                                })

                                .then(()=>carts.remove({'user': userId}))
                              
                        })   
                           
                })          
    })
}
