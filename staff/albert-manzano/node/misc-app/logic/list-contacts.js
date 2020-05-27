const fs = require('fs')
const path = require('path')

module.exports = (userId, callback) => {

    const contactsPath = path.join(__dirname, '..', 'data', 'contacts')

    fs.readdir(contactsPath, (error, files) => {
        if (error) return callback(error)

        let wasError = false

        const contacts = []

        let count = 0;
        
        files.forEach(file => {
            fs.readFile(path.join(contactsPath, file), 'utf8', (error, json) => {
                if (error) {
                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }
                    return
                }

                if (!wasError) {
                    const contact = JSON.parse(json)
                    
                    if (contact.userId === userId) contacts.push(contact)
                    
                    if (++count === files.length) callback(null, contacts)
                }
            })
        })
    })
}