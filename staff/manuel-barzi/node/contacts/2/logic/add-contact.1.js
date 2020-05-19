const readline = require('readline')
const fs = require('fs')

function addContact(...fields) {
    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

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
                const { name, surname } = contact

                const file = `${name.toLowerCase()}-${surname.toLowerCase()}.json`

                function replacer(key, value) {
                    if (typeof value === 'string')
                        return value.toUpperCase()

                    return value;
                }

                fs.writeFile(`data/${file}`, JSON.stringify(contact, replacer, 4), error => {
                    if (error) console.error('Failed to write contact file :(')

                    console.log('Contact saved')

                    interface.close()
                })
            }
        })
    })()
}

module.exports = addContact