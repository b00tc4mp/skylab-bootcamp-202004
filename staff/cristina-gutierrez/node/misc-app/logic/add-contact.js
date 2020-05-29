const fs = require('fs')
const path = require('path')
require('../utils/string')
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/json')
require('../utils/date')

module.exports = (userId, contact, callback) => {
    const { name, surname, email, phone, birthdate, country } = contact

    if (!userId) throw new TypeError(`${userId} does not exist`)
    if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`) 
    if (typeof contact !== 'object') throw new TypeError(`${contact} is not an object`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)
    if (!(name || surname) && (email || phone)) throw new TypeError(`Fill the ${name} or ${surname} and ${email} or ${phone} fields`)

    if (name) {
        String.validate.notVoid(name)
    }

    if (surname) {
        String.validate.notVoid(surname)
    }

    if (email) {
        String.validate.notVoid(email)
        Email.validate(email)
    }

    if (phone) {
        String.validate.notVoid(phone)
    }

    if (birthdate) {
        String.validate.notVoid(birthdate)
        /* Date.validate(birthdate) */
        //Date.validate(birthdate) // TODO create this polyfill
    }

    if (country) {
        String.validate.notVoid(country)
    }

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