const assert = require('assert')
const addContact = require('./add-contact')
const { random } = Math
const fs = require('fs')
const path = require('path')

{
    const name = `name-${random()}`
    const surname = `surname-${random()}`
    const email = `e-${random()}@mail.com`

    addContact({ name, surname, email }, (error, id) => {
        assert(!error)

        assert(typeof id === 'string')

        fs.readFile(path.join(__dirname, '..', 'data', 'contacts', `${id}.json`), 'utf8', (error, content) => {
            assert(!error)

            assert(content)

            const contact = JSON.parse(content)

            assert.equal(contact.name, name)
            assert.equal(contact.surname, surname)
            assert.equal(contact.email, email)

            // TODO clean data
        })
    })
}