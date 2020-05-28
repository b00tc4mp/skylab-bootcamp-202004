require('../utils/polyfills/string')
require('../utils/polyfills/json')
require('../utils/polyfills/function')
const { Email } = require('../utils')
const { users, contacts } = require('../data')

module.exports = (userId, contact, callback) => {
    String.validate.notVoid(userId)
    if (typeof contact !== 'object') throw new TypeError(`${contact} is not an object`)
    Function.validate(callback)

    // TODO make it so that at least should have the following fields: (name || suranme) && (email || phone)

    const { name, surname, email, phone, birthdate, country } = contact

    if (typeof name !== 'undefined')
        String.validate.notVoid(name)

    if (typeof surname !== 'undefined')
        String.validate.notVoid(surname)

    if (typeof email !== 'undefined') {
        String.validate.notVoid(email)
        Email.validate(email)
    }

    if (typeof phone !== 'undefined')
        String.validate.notVoid(phone)

    if (typeof birthdate !== 'undefined') {
        String.validate.notVoid(birthdate)
        //Date.validate(birthdate) // TODO create this polyfill
    }

    if (typeof country !== 'undefined')
        String.validate.notVoid(country)

    users.find({ id: userId }, (error, users) => {
        if (error) return callback(error)

        if (!users.length) return callback(new Error(`user with id ${userId} not found`))

        contact.user = userId

        contacts.create(contact, (error, id) => {
            if (error) return callback(error)

            callback(null, id)
        })
    })
}