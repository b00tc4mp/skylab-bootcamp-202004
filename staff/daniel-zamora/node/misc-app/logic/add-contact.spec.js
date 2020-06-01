const addContact = require('./add-contact')
const { random } = Math
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')



describe('addContact', () => {
    let name, surname, email, id
    
    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        id = uid()
    })

    it('should succeed on valid data', done => {
        addContact({ name, surname, email, id }, (error, id) => {
            expect(error).to.be.null
    
            expect(id).to.be.a('string')
            
            fs.readFile(path.join(__dirname, '..', 'data', 'contacts', `${id}.json`), 'utf8', (error, content) => {

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

    afterEach(()=>{
        fs.readdir(path.join(__dirname, '..', 'data', 'contacts'), (error, files) => {
            if (error) throw error
    
            files.forEach(file => {
                if (file === `${id}.json`){
                    fs.unlink(path.join(__dirname, '..', 'data', 'contacts', file),error=>{
                        if (error) throw error
                        
                    })
                }
            })
        })
    })
})






