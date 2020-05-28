const fs = require('fs')
const path = require('path')
require('../utils/polyfills/string')
const { Email, uid } = require('../utils')
require('../utils/polyfills/json')
require('../utils/polyfills/function')
const { find } = require('../data/users')

function addContact(userId, contact, callback) {
    String.validate.notVoid(userId)
    if (typeof contact !== 'object') throw new TypeError(`${contact} is not an object`) //TODO add object polifill
    Function.validate(callback)

    const { name, surname, email, phone, birthdate, country } = contact

    String.validate.notVoid(name)

    if (surname)
        String.validate.notVoid(surname)

    if (email) {
        String.validate.notVoid(email)
        Email.validate(email)
    }

    String.validate.notVoid(phone)

    if (birthdate)
        String.validate.notVoid(birthdate) //TODO add date validation

    if (country)
        String.validate.notVoid(country)

    find({ id: userId }, (error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user id ${userId} does not exist`))

        contact.user = userId
        const id = uid()
        contact.id = id

        fs.writeFile(path.join(__dirname, '..', 'data', 'contacts', `${id}.json`), JSON.prettify(contact), error => {
            if (error) return callback(error)

            callback(null, id)
        })
    })
}

module.exports = addContact