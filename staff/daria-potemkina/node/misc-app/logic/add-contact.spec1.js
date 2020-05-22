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
        assert(error === null)

        assert(typeof id === 'string')

        fs.readdir(path.join(__dirname, '..', 'data'), (error, files) => {
            assert(error === null)

            assert(files.includes(`${id}.json`))
        })

        fs.readFile(path.join(__dirname, '..', 'data', `${id}.json`), (error, data) => {
            assert(error === null)
            debugger
            
            const { name: _name, surname: _surname, email: _email } = JSON.parse(data)

            assert.equal(_name, name.toUpperCase())
            assert.equal(_surname, surname.toUpperCase())
            assert.equal(_email, email.toUpperCase())
        })
    })
}