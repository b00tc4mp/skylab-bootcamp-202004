const fs = require('fs')
const path = require('path')
require('../utils/string')

module.exports = (query,callback) => {
    String.validate.notVoid(query)
    query = query.trim().toLowerCase()
    
    
    fs.readdir(path.join(__dirname, '..', 'data'), (error, files) => {
        if (error) return callback(error)

        let wasError = false

        const contacts = []
        let count = 0;

        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..', 'data', file), 'utf8', (error, data) => {
                if (error) {
                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }

                    return
                }
 
                if (!wasError) {
                    const contact = JSON.parse(data)
                    const { name , surname } = contact
                    contact.id = file.substring(0, file.indexOf('.json'))

                    if(name.toLowerCase().includes(query)||surname.toLowerCase().includes(query)){
                        contacts.push(contact) 
                    }else{
                        count++ 
                    }
                     if (files.length === (contacts.length + count)) 
                     callback(null, contacts)
                
                   
                }
            })
        })
    })
}