const listContacts = require('../logic/list-contacts')
const Feedback = require('./Feedback')

function ListContacts() {
    try {
        listContacts((error, data) => {
            if (error) {
                return Feedback('Cannot load users data', 'error')
            } else {
                console.table(data)
            }
            
        })
    } catch ({message}) {
        Feedback(message, 'error')
    }
}

module.exports = ListContacts