const AddContact = require('./components/AddContact')
const ListContacts = require('./components/ListContacts')

AddContact(error => !error && ListContacts())


