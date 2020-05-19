const searchContact = require('../logic/search-contacts')
const readline = require('readline')

function SearchContact() {
    
    const interface = readline.Interface({
        input: process.stdin,
        output: process.stdout
    })

    interface.question('')
}