const {mongo} =require("../misc-api/data")
require('../utils/polyfills/string')
const {UnexistenceError} = require('../errors');
const{ObjectId}=mongo

module.exports = (userId) => {
    String.validate.notVoid(userId)
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
            return orders.find({userId:ObjectId(userId)})
        })
        .then(orders=>{
            if(!orders) throw new UnexistenceError(`user with _id ${userId} does not have any orders`)
            return orders.toArray()
        })
}