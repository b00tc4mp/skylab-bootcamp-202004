const readline = require('readline')
const fs = require('fs')

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const contact = {}

prompt.question('Name? ', name => {
    contact.name = name

    prompt.question('Surname? ', surname => {
        contact.surname = surname

        prompt.question('Phone? ', phone => {
            contact.phone = phone

            prompt.question('E-mail? ', email => {
                contact.email = email

                const { name, surname } = contact

                const file = `${name.toLowerCase()}-${surname.toLowerCase()}.json`

                function replacer(key, value) {
                    if (typeof value === 'string')
                        return value.toUpperCase()

                    return value;
                }

                fs.writeFile(file, JSON.stringify(contact, replacer, 4), error => {
                    if (error) console.error('Failed to write contact file :(')

                    console.log('Contact saved')

                    prompt.close()
                })
            })
        })
    })
})