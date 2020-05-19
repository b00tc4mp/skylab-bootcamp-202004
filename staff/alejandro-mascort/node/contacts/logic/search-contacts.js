const fs = require('fs')
const path = require('path')
require('../utils/function')

function searchContacts(value,callback) {
    // Function.validate(callback)

    fs.readdir(path.join(__dirname,'..','data'), (error, files) => {
        if (error) return callback(error)

        let wasError = false

        const contacts = []

        files.forEach((file) => {
            fs.readFile(path.join(__dirname,'..','data',`${file}`), (error, data) => {
                if (error) {

                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }

                    return 
                }

                if (!wasError) {
                    const contact = JSON.parse(data)

                    contact.id = file.substring(0, file.indexOf('.json'))

                    contacts.push(contact)
                    
                    if (contacts.length=== files.length) callback(null, contacts)
                }
            })
        })
    })
}

module.exports = searchContacts