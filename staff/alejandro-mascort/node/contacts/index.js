const addContact = require('./components/AddContact')
const listContacts = require('./components/ListContacts')

addContact(error => !error && listContacts())