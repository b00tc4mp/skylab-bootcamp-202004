const fs = require('fs')
const path = require('path')

function addContact(contact, callback) {

    const id = `${Date.now()}`

    const file = `${id}.json`

    fs.writeFile(path.join(__dirname, '..', 'data', file), JSON.stringify(contact, null, 4), error => {
        if (error) console.error('Failed to write contact file :(')

        callback(error, id)
    })
    
}

module.exports = addContact