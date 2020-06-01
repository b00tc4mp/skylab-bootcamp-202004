require('../utils/polyfills/string')
require('../utils/polyfills/json')
require('../utils/polyfills/number')
const { UnexistenceError } = require('../errors')
const { mongo } = require('../data')
const { ObjectId } = mongo

module.exports = (userId, productId, quantity)=>{
    String.validate.notVoid(userId)
    String.validate.notVoid(productId)
    Number.validate.positive(quantity)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')
            const products = connection.db().collection('products')
            return users.findOne({_id: ObjectId(userId)})
                .then(user=>{
                    if(!user) throw new UnexistenceError(`user with _id ${userId} not found`)

                    const{cart = [] }=user
                    //TODO Check if the product exist
                    return products.findOne({_id:ObjectId(productId)})
                        .then(_product=>{
                            if(!_product) throw new UnexistenceError(`product with _id ${productId} not found`)
                            const index= cart.findIndex(currentValue => currentValue.product.toString() === productId) 
                   
                            if(quantity === 0){
                                if(index<0) throw new UnexistenceError(`product with id ${productIndex} not found in the cart of user ${userId}`)
                                
                                cart.splice(index, 1)

                            }else{
                                let product
                                if(index < 0){
                                    product = {product: ObjectId(productId)}
                                    cart.push(product)
                                }else{
                                    product = cart[index]
                                }
                                product.quantity=quantity
                            }

                            return users.updateOne({_id:ObjectId(userId)},{ $set: {cart} })
                        })
                })
                .then(()=>{})
        })
}