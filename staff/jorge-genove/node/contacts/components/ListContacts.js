const contactList = require('../logic/contact-list')

function ListContacts(){
   
    contactList((error, list) =>{
        if(error) console.log('me he equivoquido')
        console.table(list)
    }) 
}

module.exports = ListContacts