const fs = require('fs')
const path = require('path')
require('../utils/polyfills/string')
const { Email, uid } = require('../utils')
require('../utils/polyfills/json')

module.exports = (userId, contact, callback) => {
    // TODO validate userId (string, not empty) and callback (function)
    if (typeof contact !== 'object') throw new TypeError(`${contact} is not an object`)

    // TODO make it so that at least should have the following fields: (name || suranme) && (email || phone)

    const { name, surname, email, phone, birthdate, country } = contact

    if (name)
        String.validate.notVoid(name)

    if (surname)
        String.validate.notVoid(surname)

    if (email) {
        String.validate.notVoid(email)
        Email.validate(email)
    }

    if (phone)
        String.validate.notVoid(phone)

    if (birthdate) {
        String.validate.notVoid(birthdate)
        //Date.validate(birthdate) // TODO create this polyfill
    }

    if (country)
        String.validate.notVoid(country)

    // TODO check userId is valid (i.e. the user exists), otherwise throw error

    contact.user = userId

    const id = uid()

    contact.id = id

    const file = `${id}.json`

    fs.writeFile(path.join(__dirname, '..', 'data', 'contacts', file), JSON.prettify(contact), error => {
        if (error) return callback(error)

        callback(null, id)
    })
}