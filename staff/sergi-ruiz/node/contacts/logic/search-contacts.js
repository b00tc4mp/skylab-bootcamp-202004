const fs = require('fs')
const path = require('path')

module.exports = (query, callback) => {
    fs.readdir(path.join(__dirname,'..','data'), (error, files) => {
        if (error) return callback(error)

        let wasError = false
        const contacts = []

        files.forEach(file => {
            fs.readFile(path.join(__dirname,'..','data', file), (error, json) => {
                if (error) {
                    if (!wasError) {
                        wasError = true
                        callback(error)
                    }
                    return 
                }

                if (!wasError){
                    const contact = JSON.parse(json)
                    contacts.push(contact)
                
                    if (contacts.length === files.length) {
                        let contactsFound = contacts.filter(contact => {
                            return contact.name.toLowerCase().includes(query) || contact.surname.toLowerCase().includes(query)
                        })

                        callback(null, contactsFound)
                    }
                }
            })
        })
    })
}
