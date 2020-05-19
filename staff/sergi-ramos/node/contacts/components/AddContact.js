const readline = require('readline')
const fs = require('fs')
const addContact = require('../logic/add-contact')

function AddContact() {
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
                interface.close()
                try {

                    addContact(contact, (error, id) => {

                        if (error) console.log(error) //TODO feedback
                    })

                } catch (error) {
                    //TODO feedback
                }
            }
        })
    })()
}

module.exports = AddContact