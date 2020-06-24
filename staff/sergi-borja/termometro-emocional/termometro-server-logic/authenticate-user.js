require('termometro-commons/polyfills/string')
const { models: { User } } = require('termometro-data')
const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require('termometro-commons')
const bcrypt = require('bcryptjs')

/**
 * Recieves credentials, if they're correct, will return a token with an userId associated
 * 
 * @param {string} email The user e-mail. 
 * @param {string} password The user password.
 * 
 * @returns {<String>} returns a user id.
 * 
 * @throws {TypeError} If the email doesnt exists or incorrect password
 * @throws {Error} If e-mail does not match the expected format.
 */

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return User.findOne({ email })
        .then(user => {
            if (!user) throw new UnexistenceError(`Este email no existe`)

            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) throw new CredentialsError('Contraseña incorrecta')

                    return user.id
                })
        })
}