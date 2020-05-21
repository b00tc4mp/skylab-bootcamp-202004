const addContact = require('./add-contact')

const contact = {
    name: 'Pepito',
    surname: 'Grillo',
    email: 'pepigri@mail.com',
    phone: '+34 123 123 123',
    birth: '1980/10/1',
    country: 'Spain'
}

addContact(contact, console.log)