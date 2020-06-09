/**
 * Authenticate User.
 * 
 * @param {string} email The user email. 
 * @param {string} password The user password eith min length 8.

 * @throws {CredentialError} if the you introduce a wrong password.
 * @throws {UnexistenceError} if the email is not registered.
 * @throws {VoidError} if don`t introduce name or surname or email or password.
 * @throws {TypeError} if name or surname or email or password are not a string.
 * @throws {Error} if you introduce a email with less than 8 caracteres.
 * 
 * @return Token.
 *
 */

require('books-commons/polyfills/string')
const { models: { User } } = require('books-data')
const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require('books-commons')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    String.validate.notVoid(password)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password,8);


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