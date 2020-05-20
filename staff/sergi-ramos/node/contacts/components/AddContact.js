const readline = require('readline')
const fs = require('fs')
const addContact = require('../logic/add-contact')

function AddContact(callback) {
    console.log('===========')
    console.log('Add Contact')
    console.log('===========')
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

                        callback()
                    })

                } catch (error) {
                    //TODO feedback
                }
            }
        })
    })()
}

module.exports = AddContact