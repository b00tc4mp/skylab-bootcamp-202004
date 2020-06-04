require('misc-commons/polyfills/string')
require('misc-commons/polyfills/function')
const { errors: {UnexistenceError, CredentialsError}, utils: {Email} } = require('misc-commons')
const { model: {Users} } = require('misc-data')
const bcryptjs = require("bcryptjs")

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

  
    return users.findOne({ email })   
        .then(user => {
            if (!user) throw new UnexistenceError('user does not exist')
            
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) throw new CredentialsError('wrong password')

                    return user._id.toString()
                })
        })
}  