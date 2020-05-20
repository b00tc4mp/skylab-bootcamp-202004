const listContacts = require('../logic/list-contacts')



function ListContacts() {
    console.log( '=============')
    console.log( 'List Contacts')
    console.log( '=============')

    listContacts((error, contacts) => {


        console.table(contacts)



    })
}
module.exports = ListContacts