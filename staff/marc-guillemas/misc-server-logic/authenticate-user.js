require('misc-commons/polyfills/string')
require('misc-commons/polyfills/function')
const { errors: {UnexistenceError, CredentialsError}, utils: {Email} } = require('misc-commons')
const { model: {User} } = require('misc-data')
const bcrypt = require("bcryptjs")

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    debugger
    return User.findOne({ email })   
        .then(user => {
            if (!user) throw new UnexistenceError('user does not exist')
            
            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) throw new CredentialsError('wrong password')
                    debugger
                    return user._id.toString()
                })
                .catch(error => error)
        })
}  