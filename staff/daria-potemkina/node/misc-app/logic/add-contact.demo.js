const addContact = require('./add-contact')

const contact = {
    name: 'Pepito',
    surname: 'Perez',
    email: 'pepito@mail.com',
    phone: '+34 123 123 123',
    birth: '1980/10/1',
    country: 'Spain'
}

addContact('1590319876861-0.6521119145772885', contact, console.log)