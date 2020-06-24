require('coohappy-commons/polyfills/string')
const { models: { User } } = require('coohappy-data')
const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require('coohappy-commons')
const bcrypt = require('bcryptjs')

/**
 * Authenticate user.
 * 
 * @param {string} email User email. 
 * @param {string} password User password.
 * 
 * @throws {Error} When api return some error 
 *
 */

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return User.findOne({ email })
        .then(user => {
            if (!user) throw new UnexistenceError(`User with e-mail ${email} does not exist`)

            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) throw new CredentialsError('Wrong password')

                    return user.id
                })
        })
} 