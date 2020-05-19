const readline = require('readline')
const addContact = require('../logic/add-contact')

function AddContact(callback) {
    console.log('===========')
    console.log('Add Contact')
    console.log('===========')

    const prompt = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const fields = ['name', 'surname', 'email', 'phone', 'birth', 'country']

    const contact = {}

    let count = 0;

    (function askField() {
        const field = fields[count]

        prompt.question(`${field}?`, value => {
            contact[field] = value

            if (count < fields.length-1) {
                count++

                askField()
            } else {
                prompt.close()
                try {
                    addContact(contact, error => {
                        if (error) {
                            console.log(error)

                            console.log('Failed to write contact file')

                            return callback(error)
                        }

                        console.log('Contact saved')

                        // prompt.close()
        
                        callback()
                    })
                } catch (error) {
                    callback(error)
                }
            }
        })
    })()
}

module.exports = AddContact