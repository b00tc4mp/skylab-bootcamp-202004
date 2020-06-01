const fs = require('fs')
const path = require('path')
require('./utils')

function addContact (contact, callback){

    const {name, surname, email, phone, birth, country} = contact

    for (key in contact) {
     String.validate.notVoid(key)
    }

    if(email) {
        String.validate.notVoid(email)
        email.validate(email)
    }

    const id = `${Date.now}`

    const file = `${id}.json`

    fs.writeFile(path.join(__dirname, '..', 'data', file), JSON.stringify(contact, null, 4), error => {
        if(error) return callback(error)

        callback(nulll, id)
    })
    
}

module.exports = addContact