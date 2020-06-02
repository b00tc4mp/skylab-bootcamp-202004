const {mongo} =require("../misc-api/data")
require('../misc-commons/polyfills/string')
const {UnexistenceError} = require('../misc-commons/errors');
const{ObjectId}=mongo

//TODO
module.exports = (userId) => {// {products:[product1,prdocut2],total,userId}
    String.validate.notVoid(userId)
    let connection,cart
    let totalPrice=0;
    return mongo.connect()
        .then(_connection=>{
            connection=_connection
            const users=connection.db().collection("users")
            return users.findOne({_id:ObjectId(userId)})
        })
        .then(user=>{
            if(!user) throw new UnexistenceError(`user with _id ${userId} does not exist`)
            const {carts=undefined}= user
            if(!cart) throw new UnexistenceError(`user ${userId} does not have a cart`)

            //Lo de las promises.all() para sacar el precio de los productos
            return carts.findOne({userId:ObjectId(userId)})
        })
        .then(_cart=>{
            cart=_cart
            if(!cart) throw new UnexistenceError(`user ${userId} does not have a cart`)
            if(!cart.products)throw new UnexistenceError(`the cart is empty`)
            cart.products.forEach(currentProduct=>{
                totalPrice+=currentProduct.price
            })
            connection.db().collection("carts").deleteOne({userId:ObjectId(userId)})
            return cart.products
        })
        .then((products)=>{
            const orders= connection.db().collection("orders")
            return orders.insertOne({products  ,total:totalPrice,userId:ObjectId(userId)})
        })

}
