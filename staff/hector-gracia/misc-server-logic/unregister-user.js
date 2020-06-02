const Email = require('../utils/email')
const {mongo} =require("../misc-api/data")
require('../utils/polyfills/string')
const {UnexistenceError} = require('../errors');


module.exports = (userId,email,password) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)
    let users

    return mongo.connect()
        .then(connection=>{
            users=connection.db().collection("users")
            return users.findOne({email})
        })
        .then(user=>{
            if(!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)
            users.deleteOne({_id:user._id})
            return `Deleted user ${email}`
        })
}