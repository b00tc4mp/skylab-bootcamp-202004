/**
 * Authenticate user
 * 
 * @param {string} email the user e-mail
 * @param {string} password the user password
 * 
 * @returns {Promise<Object>} the user if it resolves, an error if it rejects
 * 
 * @throws {UnexistanceError} if the user with e-mail does not exist
 * @throws {TypeError} if any of the parameters does not match the corresponding type.
 * @throws {Error} if the any of parameters is empty or blank
 */

require('gym-commons/polyfills/string')
const { utils: { Email } } = require('gym-commons')
const { models: { User } } = require('gym-data')
const { errors: { UnexistenceError, CredentialsError } } = require('gym-commons')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async() => {
        const user = await User.findOne({ email })

        if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw new CredentialsError('wrong credentials')

        return user._id.toString()
    })()
}