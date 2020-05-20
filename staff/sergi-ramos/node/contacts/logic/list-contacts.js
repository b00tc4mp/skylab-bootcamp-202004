const fs = require('fs')
const path = require('path')
let count = 0
const contacts = []
function listContacts(callback) {

    fs.readdir(path.join(__dirname,'..','data'), (error, files) => {
     
        files.forEach((file) => {
            
            fs.readFile(path.join(__dirname,'..','data',file), (error, data) => {
                
                data = JSON.parse(data)
                
                
                const {name,surname,phone, email, age, birthdate, country} = data
                contacts.push({name,surname,phone, email, age, birthdate, country})
                count++
                if(count === files.length) {
                    callback(undefined, contacts)
                    
                }
            })
        })
    })
}
module.exports = listContacts



