const assert = require('assert')
const addContact = require('./add-contact')
const { random } = Math

{
    const name = `name-${random()}`
    const surname = `surname-${random()}`
    const email = `e-${random()}@mail.com`

    addContact({ name, surname, email }, (error, id) => {
        assert(error === null)

        assert(typeof id === 'string')
        // TODO check that file <id>.json exists in data folder
        // TODO read file and check that it contains the name, surname and email
    })
}
