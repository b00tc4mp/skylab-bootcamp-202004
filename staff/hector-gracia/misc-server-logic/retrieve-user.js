const {mongo} =require("../misc-api/data")
require('../utils/polyfills/string')
const{ObjectId}=mongo

const {UnexistenceError} = require('../errors');

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return mongo.connect()
        .then(connection=>{
            const users = connection.db().collection("users")
            return users.findOne({_id: ObjectId(userId)})
        })
        .then(user=>{
            if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
            delete user._id
            delete user.password
            return user
        })
}