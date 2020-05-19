const fs = require('fs')
const path = require('path')

function searchContacts(query, callback) {
    fs.readdir(path.join(__dirname,'..','data'), (error, files) => {
        if(error) throw new Error(error)

        const contacts = []
        files.forEach(file => {
            fs.readFile(path.join(__dirname,'..','data',file), (error, data) => {
                const obj = JSON.parse(data)
                const check = value(obj)
                check.includes(query) && contacts.push(obj)

                if(contacts.length === files.length) callback(null, contacts)
            })
        })
    })
}

module.exports = searchContacts