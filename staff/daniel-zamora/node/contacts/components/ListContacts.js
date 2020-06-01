const listContacts = require('../logic/list-contacts')
const Feedback = require('./Feedback')
const style = require('./ListContacts.style')

function ListContacts(callback) {
    console.log(style.color, '=============')
    console.log(style.color, 'List Contacts')
    console.log(style.color, '=============')

    listContacts((error, contacts) => {
        if (error) {
            Feedback(error.message, 'error')

            callback(error)

            return
        }

        //console.table(contacts)

        console.log(style.color, 'Name              Surname             E-mail              Phone')
        console.log(style.color, '===============================================================')
        
        contacts.forEach(({ name = '', surname = '', email = '', phone = '' }) => console.log(style.color, `${name}             ${surname}              ${email}            ${phone}`))

        console.log('asdfasdfasdflajlkdsjfakls')
        callback(null)
    })
}

module.exports = ListContacts