const fs = require('fs')
const path = require('path')
require('../utils/string')
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/json')

module.exports = (contact, callback) => {
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

    const id = uid()

    const file = `${id}.json`

    fs.writeFile(path.join(__dirname, '..', 'data', file), JSON.prettify(contact), error => {
        if (error) return callback(error)

        callback(null, id)
    })
}