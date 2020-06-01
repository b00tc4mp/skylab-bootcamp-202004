const fs = require('fs')
const path = require('path')
require('../utils/polyfills/string')
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/polyfills/json')

module.exports = (userId, contact, callback) => {
    if (typeof contact !== 'object') throw new TypeError(`${contact} is not an object`)

    const { name, surname, email, phone, birthdate, country } = contact

    if (name) String.validate.notVoid(name)

    if (surname) String.validate.notVoid(surname)

    if (email) {
        String.validate.notVoid(email)
        Email.validate(email)
    }

    if (phone) String.validate.notVoid(phone)

    if (birthdate) String.validate.notVoid(birthdate)

    if (country) String.validate.notVoid(country)

    contact.user = userId
    
    const id = uid()

    const file = `${id}.json`

    fs.writeFile(path.join(__dirname, '..', 'data', 'contacts', file), JSON.prettify(contact), error => {
        if (error) return callback(error)

        callback(null, id)
    })
}