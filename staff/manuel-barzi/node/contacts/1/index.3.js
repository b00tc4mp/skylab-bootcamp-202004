const readline = require('readline')
const fs = require('fs')

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const contact = {}

// interface.question('Name? ', name => {
//     contact.name = name

//     interface.question('Surname? ', surname => {
//         contact.surname = surname

//         interface.question('Phone? ', phone => {
//             contact.phone = phone

//             interface.question('E-mail? ', email => {
//                 contact.email = email

//                 const { name, surname } = contact

//                 const file = `${name.toLowerCase()}-${surname.toLowerCase()}.json`

//                 function replacer(key, value) {
//                     if (typeof value === 'string')
//                         return value.toUpperCase()

//                     return value;
//                 }

//                 fs.writeFile(file, JSON.stringify(contact, replacer, 4), error => {
//                     if (error) console.error('Failed to write contact file :(')

//                     console.log('Contact saved')

//                     interface.close()
//                 })
//             })
//         })
//     })
// })

//const fields = ['name', 'surname', 'phone', 'email'];

// (function prompt(field) {
//     interface.question(`${field}? `, value => {
//         contact[field] = value

//         prompt(fields[1])

//         console.log(contact)
//     })
// })(fields[0])

let count = 0;

const fields = ['name', 'surname', 'phone', 'email', 'age'];

(function prompt(field) {
    interface.question(`${field}? `, value => {
        contact[field] = value

        if (count < fields.length - 1)
            prompt(fields[++count])
        else {
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

                interface.close()
            })
        }
    })
})(fields[count])