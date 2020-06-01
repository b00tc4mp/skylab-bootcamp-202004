const fs = require('fs')
const path = require('path')
require('../utils/string')
const Email = require('../utils/email')

function addContact (contact, callback){

    const {name, surname, email, phone, birthdate, country} = contact

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

    const id = `${Date.now}`

    const file = `${id}.json`

    fs.writeFile(path.join(__dirname, '..', 'data','contacts', file), JSON.stringify(contact, null, 4), error => {
        if(error) return callback(error)

        callback(null, id)
    })
    
}

module.exports = addContact