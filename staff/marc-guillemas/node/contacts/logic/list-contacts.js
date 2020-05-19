// TODO list all contacts in an array
const fs = require('fs')
const path = require('path')


function listContacts(callback) {
    
    fs.readdir(path.join(__dirname, '..', 'data'), (error, files) => {
        if(error) throw Error(error)
        
        
        const contacts = []
        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..', 'data', file),'utf8', (error, data) => {
                if(error) throw new Error(error)
                const contact = JSON.parse(data)
                console.log(contact)
                contacts.push(contact)
                if(contacts.length === files.length) callback(undefined, contacts)
            })
        })
        
        
    })

    // const cont = 0;
    // const contacts = []

    // (function readFiles(files) {
    //     fs.readFile(`./data/${files[cont]}`, (error, data) => {
    //         if(error) throw Error(error)
    
    //         const contact = JSON.parse(data)
    //         console.log(contact[1])
    //         contacts.push(contact)
            
    //         if(cont < files.length) readFiles();
    //         else return
            
    //     })
    // })()

    // return contacts
}

module.exports = listContacts