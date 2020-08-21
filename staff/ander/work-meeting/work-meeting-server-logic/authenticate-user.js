require('work-meeting-commons/polyfills/string')
const { models: { User } } = require('work-meeting-data')
const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require('work-meeting-commons')
const bcrypt = require('bcryptjs')
/**
 * return user Id 
 * @param {string} email email of user
 * @param {string} password encrypted password of user
 * @returns {Promise<void>} return user Id
 * @throws {TypeError} Throws an error if email not a string
 * @throws {TypeError} Throws an error if password not a string
 * @throws {UnexistenceError} Throws an error if user email does not exist
 * @throws {CredentialsError} Throws an error with wrong password
 * 
 */
module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return User.findOne({ email })
        .then(user => {
            debugger
            if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) throw new CredentialsError('wrong password')

                    return user.id
                })
        })
} 