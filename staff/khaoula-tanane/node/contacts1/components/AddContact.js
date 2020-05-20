const readline = require('readline')
const addContact = require('../logic/add-contact')
const Feedback = require('./Feedback')
const style = require('./AddContact.style')

function AddContact(callback) {
    console.log(style.color, '===========')
    console.log(style.color, 'Add Contact')
    console.log(style.color, '===========')

    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const fields = ['name', 'surname', 'email', 'phone', 'birth', 'country']

    const contact = {}
    let count = 0;

    (function askField() {
        const field = fields[count]

        interface.question(`${field}? `, value => {
            contact[field] = value

            if (count < fields.length - 1) {
                count++

                askField()
            } else {
                try {
                    addContact(contact, error => {
                        if (error) {
                            console.log(error)

                            Feedback('Failed to write contact file :(', 'error')
                        }

                        Feedback('Contact saved')

                        interface.close()

                        callback()
                    })
                } catch ({ message }) {
                    Feedback(message, 'error')
                }
            }
        })
    })()
}

module.exports = AddContact