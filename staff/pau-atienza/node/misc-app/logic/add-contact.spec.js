const {addContact} = require('.')
const { random } = Math
const fs = require('fs')
const path = require('path')
const {uid, deleteFilesByExtensionFromDirectory} = require('../utils')
const { expect } = require('chai')


describe.only('addContact', () => {
    let name, surname, email, id
    const string = 'mock-contacts'
    const data = path.join(__dirname, '..', 'data')
    beforeEach(done => {
      
        deleteFilesByExtensionFromDirectory(path.join(data, string), '.json', error => {
            if (error) return done(error)

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            id = uid()
            done()
        })
    })

    it('should succeed on valid data', done => {
        addContact({ name, surname, email, id }, string,(error, contactid) => {
            expect(error).to.be.null
    
            expect(contactid).to.be.a('string')
            
            fs.readFile(path.join(data, string, `contact-${contactid}.json`), 'utf8', (error, content) => {

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

    it('should fail when inputs do not meet the criteria', () => {
        expect(function(){
            addContact({ name: 1, surname, email, id }, (error, id) => { 
                if(error) throw error
               
            })
        }).to.throw(TypeError)

        expect(function(){
            addContact({ name, surname: 1, email, id }, (error, id) => { 
                if(error) throw error
               
            })
        }).to.throw(TypeError)

        expect(function(){
            addContact({ name, surname, email: 1, id }, (error, id) => { 
                if(error) throw error
               
            })
        }).to.throw(TypeError)

        expect(function(){
            addContact({ name, surname, email, id: 1 }, (error, id) => { 
                if(error) throw error
               
            })
        }).to.throw(TypeError)

        expect(function(){
            addContact({ name, surname, email, id}, 1)
        }).to.throw(TypeError)

        expect(function(){
            addContact(1, (error, id) => { 
                if(error) throw error
               
            })
        }).to.throw(TypeError)
    })

    afterEach(done=>{
        deleteFilesByExtensionFromDirectory(path.join(data, string), '.json', error => {
            if(error) throw error

            done()
        })
    })
})






