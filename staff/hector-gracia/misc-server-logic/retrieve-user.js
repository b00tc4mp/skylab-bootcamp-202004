require("misc-commons/polyfills/string")
const {UnexistenceError} = require("misc-commons/errors")
const { mongoose: { ObjectId }, models: { User } } = require('misc-data')

module.exports = (userId) => {
    String.validate.notVoid(userId)
    return User.findOne({_id:ObjectId(userId)}).lean()
        .then(user=>{
            if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
            
            delete user._id
            delete user.password
            return {user}
        })
}