const fs = require('fs')
const path = require('path')
require('../utils/string')
const Email = require('../utils/email')
require('../utils/json')
require('../utils/function')
const uid = require('../utils/uid')


module.exports = (contact, callback) => {
    if (typeof contact !== 'object') throw new TypeError(`${contact} is not an object`)
    Function.validate(callback)
    // TODO make it so that at least should have the following fields: (name || suranme) && (email || phone)

    const { name, surname, email, id} = contact

    if (name)
        String.validate.notVoid(name)

    if (surname)
        String.validate.notVoid(surname)

    if (email) {
        String.validate.notVoid(email)
        Email.validate(email)
    }

    String.validate.notVoid(id)

    const file = `contact-${uid()}.json`

    fs.writeFile(path.join(__dirname, '..', 'data', 'contacts', file), JSON.prettify(contact), error => {
        if (error) return callback(error)

        callback(null, id)
    })
}