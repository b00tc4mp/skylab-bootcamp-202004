const listContacts = require('../logic/list-contacts')

function ListContacts(){
    listContacts((error, obj) =>{
        if (error) throw error
        
        console.table(obj)
    })
}

module.exports = ListContacts