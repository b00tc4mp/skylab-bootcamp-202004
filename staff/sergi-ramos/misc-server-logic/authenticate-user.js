require('misc-commons/polyfills/string')
require('misc-commons/polyfills/function')
const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require('misc-commons')
const bcrypt = require('bcryptjs')
const { model: { User } } = require('misc-data')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)


    return users.findOne({ email })

        .then(user => {
            if (!user) throw new UnexistenceError('user does not exist')

            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) throw new CredentialsError('wrong password')

                    return user._id.toString()
                })
        })
} 