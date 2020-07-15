/**
 * Checks user credentials.
 * 
 * @param {string} email The user e-mail. 
 * @param {string} password The user password.
 * 
 * @returns {Promise<String>} The authorization token if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If e-mail does not match the expected format.
 * @throws {UnexistenceError} If can not find user.
 * @throws {CredentialsError} If password is wrong.
 */

require('nomad-commons/polyfills/string')
const { models: { User } } = require('nomad-data')
const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require('nomad-commons')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return User.findOne({ email })
        .then(user => {
            if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) throw new CredentialsError('wrong password')

                    return user.id
                })
        })
} 