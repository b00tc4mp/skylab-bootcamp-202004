//const {mongo}=require("../misc-data")
require("misc-commons/polyfills/string")
const { Email } = require('misc-commons/utils')
const {CredentialsError,UnexistenceError} = require("misc-commons/errors")
const {models:{User}} = require("misc-data")
const bcrypt= require("bcryptjs")

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return User.findOne({email})
        .then(user=>{
            if(!user) throw new UnexistenceError(`user with ${email} does not exist`)
            return bcrypt.compare(password,user.password)
                .then(match=>{
                    if(!match) throw new CredentialsError("wrong password")
                    return user._id.toString()
                })
        })
} 