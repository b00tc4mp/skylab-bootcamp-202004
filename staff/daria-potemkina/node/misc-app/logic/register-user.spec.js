const registerUser = require('./register-user')
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')


describe.only('logic - registerUser', () => {
    let name, surname, email, password, user

    beforeEach((done) => {
        deleteFilesByExtensionFromDirectory(path.join(__dirname, '..', 'data', 'users'), '.json', error => {
            if (error) return done(error)
            debugger
            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`
            // userId = uid()
            debugger
            // user = {name, surname, email, password}
            done()
        })
    })
    
    it('should register an user in Data', done =>{
        registerUser({name, surname, email, password}, (error, id ) =>{
            debugger
            expect(error).to.be.null

            expect(id).to.be.a('string')
            
            fs.readdir(path.join(__dirname, '..', 'data', 'users'), (error, files)=>{
                expect(error).to.be.null

                expect(files.length).to.equal(1)
                expect(files).to.have.lengthOf(1)

                expect(files.includes(`${id}.json`)).to.be.true

                done()

            })
        })
    })

    afterEach(done =>{
        deleteFilesByExtensionFromDirectory(path.join(__dirname, '..', 'data', 'users'), '.json', error => {
            if (error) return done(error)

            done()
        })
    })
})