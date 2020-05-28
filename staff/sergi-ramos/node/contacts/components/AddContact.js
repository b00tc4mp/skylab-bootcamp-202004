module.exports = () => {
    return `<h2>Add contact</h2>
    <form action="/add-contact" method="POST">
                <input type="text" name="name">
                <input type="text" name="surname">
                <input type="email" name="email">
                <input type="text" name="phone">
                <button>Add</button>
    </form>`
}









/* // TODO web

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

    const fields = ['name', 'surname', 'email', 'phone', 'birthdate', 'country']

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
                interface.close()

                try {
                    addContact(contact, error => {
                        if (error) {
                            Feedback('Failed to write contact file :(', 'error')

                            return callback(error)
                        }

                        Feedback('Contact saved')

                        callback()
                    })
                } catch (error) {
                    Feedback(error.message, 'error')

                    callback(error)
                }
            }
        })
    })()
}

module.exports = AddContact */