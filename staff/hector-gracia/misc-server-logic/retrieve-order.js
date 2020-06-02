const {mongo} =require("../misc-api/data")
require('../utils/polyfills/string')
const {UnexistenceError, CredentialsError} = require('../errors');
const{ObjectId}=mongo

module.exports = (userId,orderId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(orderId)
    let connection
    return mongo.connect()
        .then(_connection=>{
            connection=_connection
            const users=connection.db().collection("users")
            return users.findOne({_id:ObjectId(userId)})
        })
        .then(user=>{
            if(!user) throw new UnexistenceError(`user with _id ${userId} does not exist`)
            const orders= connection.db().collection("orders")
            return orders.findOne({_id:ObjectId(orderId)})
        })
        .then(order=>{
            if(!order) throw new UnexistenceError(`order with _id ${orderId} does not exist`)
            if(order.userId.toString()!==userId) throw new CredentialsError(`the order is not owned by user ${orderId}`)
            return order
        })
}