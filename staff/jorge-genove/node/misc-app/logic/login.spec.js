const login = require('./login')
const { random } = Math
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')

describe.only('login', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password= `${random}`
        user = uid()

        fs.writeFile(path.join(__dirname, "..", "data", "users", user), JSON.stringify({name,surname,email,password,user}, null, 4), error => {
            if (error) throw error

            callback(null, matched )
    

        })
    })
    it('should succeed on valid data', done => {
        login({ email,password }, (error)  => {
            expect(error).to.be.null
    
            expect(id).to.be.a('string')
    
        
            fs.readFile(path.join(__dirname, '..', 'data', 'users', `${id}.json`), 'utf8', (error, content) => {

                
                expect(error).to.be.null
    
                expect(content).to.exist
    
                const contact = JSON.parse(content)
    
                
                expect(contact.password).to.equal(password)
                expect(contact.email).to.equal(email)

                done()
            })
        })
    })

    // TODO clean data (on after)
})