const addContact = require('./components/AddContact')
const listContacts = require('./components/ListContacts')
const Landing = require('./Landing')
const Feedback = require('./Feedback')
addContact(error => !error && listContacts())

module.exports = () => Landing((error, option) => {
    if (error) return Feedback(error.message, 'error')

    if (option === 'add contact') {
        addContact(error => {
            if (error) return Feedback(error.message, 'error')
        })
    }
})