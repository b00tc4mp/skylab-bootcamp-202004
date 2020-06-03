require('misc-commons/polyfills/string')
const { errors: { UnexistenceError, CredentialsError } } = require('misc-commons');
const { mongo } = require('misc-data')

module.exports = (userId, cartId)=>{
    String.validate.notVoid(userId)
    String.validate.notVoid(cartId)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')
            const products = connection.db().collection('products')
            return users.findOne({_id: mongo.ObjectId(userId) })
                .then(user => {
                    if (!user) throw new UnexistenceError(`this ${userId} does not exist`)
                
                    if (!user.cart.length) throw new UnexistenceError(`cart is empty`)

                    let date = new Date()
                    cart.date = date.toISOString()

                    // {userid, products: [{name: , price: , quantity: }, {}], totalprice: x}

                    const order = {userId, products: [], totalprice: 0}
                    let products
                    Promise.all(
                        user.cart.map(({product})=>{
                            return products.findOne({_id: product})
                        })
                    ).then(_products =>{console.log(products); return products = _products})

                    // products.forEach(({name, })=>{
                    //     const container= {id, quantity}
                    // })
                    
                    const orders = connection.db().collection('orders')
                    // add to histoy
                    return orders.findOne({user: userId})
                        .then(order => {
                            if (!order) {
                                return orders.insertOne({'history': [products], 'user' : userId})
                            }
                            else {
                                return orders.updateOne({user: userId},{
                                    $push : {'history': { $each: [products] } }
                                })
                            }
                        })

                        .then(()=>carts.remove({'user': userId}))
                              
                         
                           
                })          
    })
}
