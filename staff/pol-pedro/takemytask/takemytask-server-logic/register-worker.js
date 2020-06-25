require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
require('takemytask-commons/polyfills/number')
require('takemytask-commons/polyfills/object')
const { utils: { Email }, errors: { DuplicityError } } = require('takemytask-commons')
const { models: { Worker, User } } = require('takemytask-data')
const bcrypt = require('bcryptjs')

/**
 * Register worker
 *
 * @param {string} name worker name
 * @param {string} surname worker surname 
 * @param {string} email worker email
 * @param {string} password worker password
 * @param {string} adress worker adress
 * @param {string} bankAcount worker bankacoutn
 * @param {string} description worker description 
 * @param {string} presentation worker presentation 
 * @param {string} pricingHour worker pricing
 * @param {string} jobArray worker job categories
 * @param {string} workingDistance worker working distance
 * 
 * @returns {undefined}
 *
 * @throws {DuplicityError} if worker already exists
 */

module.exports = (name, surname, email, password, adress, bankAcount, description, presentation, pricingHour, jobCategories, workingDistance) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    String.validate.notVoid(bankAcount)
    String.validate.notVoid(description)
    String.validate.notVoid(presentation)
    Number.validate.integer(pricingHour)
    Object.validate(jobCategories)
    Number.validate.integer(workingDistance)

    return (async () => {
        const user = await User.findOne( {email} )

        if (user) throw new DuplicityError(`user with e-mail ${email} already exists`)

        const worker = await Worker.findOne({ email })

        if (worker) throw new DuplicityError(`worker with e-mail ${email} already exists`)

        const hash = await bcrypt.hash(password, 10)

        await Worker.create({ name, surname, email, password: hash, adress, bankAcount, description, presentation, pricingHour, jobCategories, workingDistance })
    })()
}