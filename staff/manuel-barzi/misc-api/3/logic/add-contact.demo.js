const uid = require('../utils/uid')
const addContact = require('./add-contact')

const contact = {
    name: 'Pepito',
    surname: 'Grillo',
    email: 'pepigri@mail.com',
    phone: '+34 123 123 123',
    birth: '1980/10/1',
    country: 'Spain'
}

addContact('1590572120776-0.4543098325900867', contact, console.log)