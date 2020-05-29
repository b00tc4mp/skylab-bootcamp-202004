const addContact = require('./add-contact')

const contact = {
    name: 'Pepito',
    surname: 'Grillo',
    email: 'pepigri@gmail.com',
    phone: '+34 123 123 123',
    birth: '1980/10/1'
}

addContact(contact, console.log)