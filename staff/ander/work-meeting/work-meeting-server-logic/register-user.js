/**
 * register the user
 * @param {string} name name of user
 * @param {string} surname surname of user
 * @param {string} email email of user
 * @param {string} password password of user
 * @throws {TypeError} Throws an error if user with email already exist
 */
require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const { utils: { Email }, errors: { DuplicityError } } = require('work-meeting-commons')
const { models: { User } } = require('work-meeting-data')
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