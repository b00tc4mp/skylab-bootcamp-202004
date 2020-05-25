const fs = require('fs')
const path = require('path')

module.exports = (id, query, string, callback) => {

    query = query.toLowerCase()

    fs.readdir(path.join(__dirname, '..', 'data', string), (error, files) => {
        if (error) return callback(error)

        let wasError = false

        const contacts = []
        let count = 0

        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..', 'data', string, file), 'utf8', (error, json) => {
                if (error) {
                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }

                    return
                }

                if (!wasError) {
                    const contact = JSON.parse(json)

                    const values = Object.values(contact)

                    const matches = values.some(value => value.toLowerCase().includes(query))

                    if (matches && contact.id === id) contacts.push(contact)

                    if (++count === files.length) callback(null, contacts)
                }
            })
        })
    })
} 