const fs = require('fs')
const path = require('path')

module.exports = callback => {
    fs.readdir(path.join(__dirname, '..', 'data'), (error, files) => {
        if (error) return callback(error)

        let wasError = false

        const contacts = []

        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..', 'data', 'contacts', file), 'utf8', (error, json) => {
                if (error) {
                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }

                    return
                }

                if (!wasError) {
                    const contact = JSON.parse(json)

                    contact.id = file.substring(0, file.indexOf('.json'))

                    contacts.push(contact)

                    if (contacts.length === files.length) callback(null, contacts)
                }
            })
        })
    })
}