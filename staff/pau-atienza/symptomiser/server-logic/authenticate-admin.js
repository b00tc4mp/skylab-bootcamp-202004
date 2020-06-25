/**
 * Checks user credentials and compares them with the user in the database.
 * 
 * @param {string} email The user e-mail. 
 * @param {string} password The user password.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {UnexistenceError} If the user does not exist in the database.
 * @throws {CredentialsError} If the credentials are wrong.
 * @throws {Error} If e-mail does not match the expected format.
 */

require('commons/polyfills/string')
const { models: { Admin } } = require('data')
const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require('commons')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () => {
        const admin = await Admin.findOne({ email })

        if (!admin) throw new UnexistenceError(`Admin with e-mail ${email} does not exist`)

        const match = await bcrypt.compare(password, admin.password)

        if (!match) throw new CredentialsError('wrong password')

        return admin.id
    })()
} 