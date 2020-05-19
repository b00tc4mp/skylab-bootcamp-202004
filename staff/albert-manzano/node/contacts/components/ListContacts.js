const readFilesList = require('../logic/list-contacts')


function ListContacts() {
   
    readFilesList((error,results)=>{
        if (error) throw error

        console.table(results)
    })
}

module.exports = ListContacts
