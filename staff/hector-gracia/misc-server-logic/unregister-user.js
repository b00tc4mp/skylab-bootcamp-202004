const { Email } = require('misc-commons/utils')
const { mongoose: { ObjectId }, models: { User } } = require('misc-data')
require("misc-commons/polyfills/string")
const {UnexistenceError} = require("misc-commons/errors")
const bcrypt= require("bcryptjs")


module.exports = (userId,email,password) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return User.findOne({_id:ObjectId(userId)}).lean()
        .then(user=>{
            if(!user) throw new UnexistenceError(`user with _id ${userId} does not exist`)
            if(user.email!== email)throw new CredentialsContainer("Id and email doesn't match")
            return bcrypt.compare(password,user.password)
                .then(match=>{
                    if(!match) throw new CredentialsError("wrong password")
                    return User.deleteOne({_id:ObjectId(userId)})
                })
                .then(()=>{return `Deleted user ${email}`})
        })
}