const fs = require('fs')
const path = require('path')
require('../utils/string')
const Email = require('../utils/email')
const uid =require('../utils/uid')

function addContact(contact, callback) {
    if (typeof contact !== 'object') throw new TypeError(`${contact} is not an object`)

    const { name, surname, email, phone, birth, country } = contact

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

    if (birth)
        String.validate.notVoid(birth)

    if (country)
        String.validate.notVoid(country)


    const id = uid()

    const file = `${id}.json`

    function replacer(key, value) {
        if (typeof value === 'string') return value.toUpperCase()

        return value
    }

    fs.writeFile(path.join(__dirname, '..', 'data', 'contacts', file), JSON.stringify(contact, replacer, 4), error => {
        if (error) return callback(error)

        callback(null, id)
    })
}

module.exports = addContact