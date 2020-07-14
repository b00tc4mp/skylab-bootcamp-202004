require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
const { utils: { Email }, errors: { DuplicityError } } = require('takemytask-commons')
const { models: { User } } = require('takemytask-data')
const bcrypt = require('bcryptjs')

/**
 * Register User
 *
 * @param {string} name users name
 * @param {string} surname users surname 
 * @param {string} email users email
 * @param {string} password users password
 * @param {string} adress users adress
 * 
 * @returns {undefined}
 *
 * @throws {DuplicityError} if user already exists
 */

module.exports = (name, surname, email, password, adress) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    String.validate.notVoid(adress)

    return (async () => {
        const user = await User.findOne({ email })

        if (user) throw new DuplicityError(`user with e-mail ${email} already exists`)

        const hash = await bcrypt.hash(password, 10)

        await User.create({ name, surname, email, password: hash, adress })
    })()
}