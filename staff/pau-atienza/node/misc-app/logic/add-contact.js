const fs = require('fs')
const path = require('path')
require('../utils/polyfills/string')
require('../utils/polyfills/json')
require('../utils/polyfills/function')
const {uid, Email} = require('../utils')

module.exports = (contact, string, callback) => {
    if (typeof contact !== 'object') throw new TypeError(`${contact} is not an object`)
    Function.validate(callback)

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
    const contactid = uid()
    const file = `contact-${contactid}.json`

    

    fs.writeFile(path.join(__dirname, '..', 'data', string, file), JSON.prettify(contact), error => {
        if (error) return callback(error)

        callback(null, contactid)
    })
}