require('../misc-commons/polyfills/string')
const{mongo}= require("../misc-api/data")
const{ObjectId}=mongo
const {UnexistenceError} = require('../misc-commons/errors');
/////////En desuso, usar update cart////////
module.exports=(userId)=>{ //{products:[product 1,product2],userId}
    String.validate.notVoid(userId)
    let connection
    return mongo.connect()
        .then(_connection=>{
            connection=_connection
            const users= connection.db().collection("users")
            return users.findOne({_id:ObjectId(userId)})
        })
        .then(user=>{
            if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
            const carts= connection.db().collection("carts")
            return carts.insertOne({userId:ObjectId(userId),products:[]})
        })
}