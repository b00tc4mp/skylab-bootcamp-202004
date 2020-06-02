require('../misc-commons/polyfills/string')
const{mongo}= require("../misc-api/data")
const{ObjectId}=mongo
const {UnexistenceError} = require('../misc-commons/errors');
/////////En desuso, usar update cart////////
module.exports=(userId,productId)=>{ 
    String.validate.notVoid(userId)
    let connection,carts
    return mongo.connect()
        .then(_connection=>{
            connection=_connection
            const users= connection.db().collection("users")
            return users.findOne({_id:ObjectId(userId)})
        })
        .then(user=>{
            if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
            const products= connection.db().collection("products")
            return products.findOne({_id:ObjectId(productId)})
        })
        .then(product=>{
            if(!product) throw new UnexistenceError(`product with id ${productId} does not exist`)
            carts = connection.db().collection("carts")
            return carts.findOne({userId:ObjectId(userId)})
        })
        .then(cart=>{
            if(!cart) throw new UnexistenceError(`user ${userId} does not have a cart`)
            const index=cart.products.findIndex((currentProduct)=>currentProduct._id.equals(ObjectId(productId)))
            if(index===-1) throw new UnexistenceError(`the cart ${cart._id} does not include the product ${productId}`)
            cart.products.splice(index,1)
            return carts.updateOne({_id:cart._id},{$set:{"products":cart.products}})
        })
}