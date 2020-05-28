
const registerUser = require('./register-user')
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')


describe('logic register-user', () => {   
    let username, email, password, id

        before (done => {
        username = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `${random()}`
        done()
        })

        it('should register an user in data', done => { 
        
          registerUser({username, email, password}, (error, id) => {

            fs.readFile(path.join(__dirname, '..', 'data', 'users', `${id}.json`), 'utf8', (error, content) => {
                expect(error).to.be.null
                expect(content).to.exist
    
                const contact = JSON.parse(content)
    
                expect(contact.username).to.be.equal(username)
                expect(contact.email).to.be.equal(email)

                done()
            })
          })
        })

        it('Should throw and error due user already exist', done => {
          let _username = username
          let _email = email
          let _password = password
              registerUser({_username, _email, _password}, (error, id) => {

                fs.readFile(path.join(__dirname, '..', 'data', 'users', `${id}.json`), 'utf8', (error, content) => {
                  expect(error).to.exist
  
                  done()
              })
        })

    after()
    })
