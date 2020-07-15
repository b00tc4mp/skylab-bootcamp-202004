/**
 * Creates new user.
 * 
 * @param {string} name The user name. 
 * @param {string} surname The user surname. 
 * @param {string} email The user e-mail. 
 * @param {string} password The user password.
 * 
 * @returns {Promise<String>} The user object if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {DuplicityError} If email is already registered for other user.
 */

require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/json')
const { utils: { Email }, errors: { DuplicityError } } = require('nomad-commons')
const { models: { User } } = require('nomad-data')
const bcrypt = require('bcryptjs')

module.exports = (name, surname, email, password) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () => {
        const user = await User.findOne({ email })

        if (user) throw new DuplicityError(`user with e-mail ${email} already exists`)

        const hash = await bcrypt.hash(password, 10)

        await User.create({ name, surname, email, password: hash })
    })()
}