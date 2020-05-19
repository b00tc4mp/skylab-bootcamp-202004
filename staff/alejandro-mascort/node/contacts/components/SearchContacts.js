const readline = require('readline')
const searchContacts = require('../logic/search-contacts')
const Feedback = require('./Feedback.style')

function SearchContacts() {
    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    interface.question('User Search: ', value => {
        try {
            searchContacts(value, (error, data) =>{
                if (error) {
                    interface.close()
                    return Feedback('An error has ocurred', 'error')
                }

                console.log(data)
                interface.close()
            })
        } catch ({message}) {
            interface.close()
            Feedback(message, 'error')
        }
    })
}

SearchContacts()