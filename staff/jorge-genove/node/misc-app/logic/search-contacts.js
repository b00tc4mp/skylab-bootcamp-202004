const fs = require('fs')
const path = require('path')

const searchContacts = (userId,query,callback) => {console.log ('he entrado')
    fs.readdir(path.join(__dirname, '..', 'data','contacts'), (error, files) => {
        if (error) return callback(error)

        files = files.filter(file => path.extname(file) === '.json')
        let wasError = false

        const contacts = []
        let count = 0

        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..', 'data','contacts', file), 'utf8', (error, json) => {
                if (error) {
                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }

                    return
                }

                if (!wasError) {
                    const contact = JSON.parse(json)
                    if(contact.userId!==userId) return

                    const values = Object.values(contact)

                    const matches = values.some(value => value.includes(query))

                    if (matches) {
                        contact.id = file.substring(0, file.indexOf('.json'))
    
                        contacts.push(contact)
                    }

                    if (++count === files.length) callback(null, contacts)
                }
            })
        })
    })
}
module.exports = searchContacts