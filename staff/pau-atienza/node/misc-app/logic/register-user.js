const fs = require('fs')
const path = require('path')
require('../utils/string')
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/json')

module.exports = (contact, callback) => {
    if (typeof contact !== 'object') throw new TypeError(`${contact} is not an object`)

    const { username, email, password } = contact
    
    String.validate.notVoid(username)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    const id = uid()

    const file = `${id}.json`

    fs.writeFile(path.join(__dirname, '..', 'data', 'users', file), JSON.prettify(contact), error => {
        if (error) return callback(error)

        callback(null, id)
    })
}