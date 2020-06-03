require('misc-commons/polyfills/string')
require('misc-commons/polyfills/function')
const { errors: {UnexistenceError, CredentialsError}, utils: {Email} } = require('misc-commons')
const { mongo } = require('misc-data')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

debugger
    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')
            debugger
            return users.findOne({ email })
        })
        .then(user => {
            if (!user) throw new UnexistenceError('user does not exist')
            if (user.email === email && user.password === password) {
                return user._id.toString()
            } else {
                throw new CredentialsError('wrong credentials')
            }
        })

        require('misc-commons/polyfills/string')
        const { mongo } = require('misc-data')
        const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require('misc-commons')
        const bcrypt = require('bcryptjs')
        
        module.exports = (email, password) => {
            String.validate.notVoid(email)
            Email.validate(email)
            String.validate.notVoid(password)
        
            return mongo.connect()
                .then(connection => {
                    const users = connection.db().collection('users')
        
                    return users.findOne({ email })
                })
                .then(user => {
                    if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)
        
                    return bcrypt.compare(password, user.password)
                        .then(match => {
                            if (!match) throw new CredentialsError('wrong password')
        
                            return user._id.toString()
                        })
                })
        } 
}  