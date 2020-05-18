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
        
                console.log(contact)
            })
        })
    })
})