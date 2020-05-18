const assert = require('assert')
const addContact = require('./add-contact')
const path = require('path')
const { random } = Math
const fs = require('fs')

{
    const name = `name-${random()}`
    const surname = `surname-${random()}`
    const email = `e-${random()}@mail.com`

    addContact({ name, surname, email }, (error, id) => {
        assert(error === null)

        assert(typeof id === 'string')
        assert(fs.existsSync(path.join(__dirname, '..', 'data', `${id}.json`)))

        fs.readFile(path.join(__dirname,'..','data', `${id}.json`), (error, data) => {
            assert(error === null)

            const user = JSON.parse(data)
            
            assert(user.name === name.toUpperCase())
            assert(user.surname === surname.toUpperCase())
            assert(user.email === email.toUpperCase())
        })
    })
}

{
    const name = `name-${random()}`
    const surname = true
    const email = `e-${random()}@mail.com`
    try {
        addContact({name, surname, email}, (error, id) => {}) 
    } catch (error) {
        assert(error !== null)
        assert(error.message === 'true is not a string')
    }
   
}