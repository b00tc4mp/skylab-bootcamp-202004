const {mongo} =require("../misc-api/data")
require('../misc-commons/polyfills/string')
const {UnexistenceError} = require('../misc-commons/errors');
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
            const {cart=undefined}= user
            if(!cart) throw new UnexistenceError(`user with _id ${userId} does not have a cart`)
            return cart
        })
}