/**
 * Checks user credentials and compares them with the user in the database.
 * 
 * @param {string} email The user e-mail. 
 * @param {string} username The name chosen by the user. 
 * @param {string} password The user password.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {DuplicityError} If a user with the same email already exists in the database
 * @throws {Error} If e-mail does not match the expected format.
 */

 require('commons/polyfills/string')
require('commons/polyfills/json')
const { utils: { Email }, errors: { DuplicityError } } = require('commons')
const { models: { Admin } } = require('data')
const bcrypt = require('bcryptjs')

module.exports = (username, email, password) => {
    String.validate.notVoid(username)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () => {
        const admin = await Admin.findOne({ email })

        if (admin) throw new DuplicityError(`${email} is already in use`)

        const hash = await bcrypt.hash(password, 10)

        await Admin.create({ username, email, password: hash })
        return
    })()
}