const listContacts = require('../logic/list-contacts')

function ListContacts(callback){
    listContacts((error, obj) =>{
        if (error) return callback(error)
        
        console.table(obj)

        callback(null)
    })
}

module.exports = ListContacts