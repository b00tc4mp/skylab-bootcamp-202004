const listContacts = require('../logic/list-contacts')
const Feedback = require('./Feedback')
const style = require('./ListContacts.style')

function SearchContacts(callback) {
    console.log(style.color, '=============')
    console.log(style.color, 'Search Contacts')
    console.log(style.color, '=============')

    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    (function introduceQuery() {
        console.log(style.color)
        interface.question(`Introduce your query:`,
            value => {
                interface.close()

                listContacts((error, contacts) => {
                    if (error) {
                        Feedback(error.message, 'error')

                        callback(error)

                        return
                    }

                    const filteredContacts = contacts.filter(({ name, surname, email }) => {
                        return name && name.includes(value) || surname && surname.includes(value) || email && email.includes(value)
                    })
                    
                    console.log(style.color, 'Name              Surname             E-mail              Phone')
                    console.log(style.color, '===============================================================')

                    filteredContacts.forEach(({ name = '', surname = '', email = '', phone = '' }) => console.log(style.color, `${name}             ${surname}              ${email}            ${phone}`))

                    console.log('asdfasdfasdflajlkdsjfakls')
                    callback(null)
                })

                callback(null, value) //check callback
            })
    })()

}

module.exports = SearchContacts