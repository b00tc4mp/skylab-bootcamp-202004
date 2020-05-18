const listContacts = require('../logic/list-contacts')
const Feedback = require('./Feedback')

function ListContacts() {
    try {
        listContacts((error, data) => {
            if (error) {
                console.log(error)
                Feedback('Cannot load users data', 'error')
            } else {
                console.log(data)
            }
            
        })
    } catch ({message}) {
        Feedback(message, 'error')
    }
}

module.exports = ListContacts