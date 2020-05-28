const assert = require('assert')
const addContact = require('./add-contact')
const fs = require('fs')
const path = require('path')
const { random } = Math


{
    const name = `name-${random()}`
    const surname = `surname-${random()}`
    const email = `e-${random()}@mail.com`

    addContact({ name, surname, email }, (error, id) => {
        assert(!error)
        
        assert(typeof id === 'string')

        fs.readFile(path.join(__dirname, '..', 'data',`${id}.jason`),'utf8', (error, files) => {
            assert(!error)
            assert(files)

            assert(!error)
            assert.equal(files.name, name)
            assert.equal(files.surname, surname)
            assert.equal(files.email, email)

        })
    })

}