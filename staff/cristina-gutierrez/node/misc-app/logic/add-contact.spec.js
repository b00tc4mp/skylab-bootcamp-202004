const addContact = require('./add-contact')
const { random } = Math
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')

describe.only('addContact', () => {
    let name, surname, email

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
    })

    it('should succeed on valid data', done => {
        addContact(uid(), { name, surname, email }, (error, id) => { // WARN do not use uid directly... create a user first in before each
            expect(error).to.be.null
    
            expect(id).to.be.a('string')
    
            debugger
            fs.readFile(path.join(__dirname, '..', 'data', 'contacts', `${id}.json`), 'utf8', (error, content) => {

                debugger
                expect(error).to.be.null
    
                expect(content).to.exist
    
                const contact = JSON.parse(content)
    
                expect(contact.name).to.equal(name)
                expect(contact.surname).to.equal(surname)
                expect(contact.email).to.equal(email)

                done()
            })
        })
    })

    // TODO clean data (on after)
})