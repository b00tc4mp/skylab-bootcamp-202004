/**
 * Register user
 * 
 * @param {string} name the user name
 * @param {string} surname the user surname
 * @param {string} email the user email
 * @param {string} password the user password
 * 
 * @returns {Promise} if it resolves, an error if it rejects
 * 
 * @throws {DuplicityError} if the user with the same e-mail already exists
 * @throws {TypeError} if any of the parameters does not match the corresponding type
 * @throws {Error} if any of the parameters is empty or blank
 */

require('gym-commons/polyfills/string')
const { utils: { Email } } = require('gym-commons')
const { errors: { DuplicityError } } = require('gym-commons')
const { models: { User } } = require('gym-data')
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