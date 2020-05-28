const listContacts = require('./list-contacts')

listContacts((error, contacts) => {
    if (error) return console.error(error)

    console.log(contacts)
})