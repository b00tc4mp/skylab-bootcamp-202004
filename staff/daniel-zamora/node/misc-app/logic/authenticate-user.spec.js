const authenticateUser = require ('./authenticate-user')
const fs = require('fs')
const path = require('path')
const { random } = Math
const uid = require('../utils/uid')
const { expect } = require ('chai')
require('../utils/json')
const Email = require('../utils/email')

describe.only('logic-authenticateUsers', () => {

    let name, surname, email, password, userId
    beforeEach(done => {

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        userId = uid()
        const user = { name, surname, email, password }
        
        fs.writeFile(path.join(data, 'users', `${userId}.json`), JSON.prettify(user), error => {
            if (error) return done(error)
        }) 
    
    })

    it('Should authenticate with correct data', done => {

        authenticateUser(email, password, (error, userDetails) => {
            const { id, name} = userDetails
            expect(error).to.be.null
            expect(id).to.be.a('string')
            

        })

    })

    afterEach(done => {
        
    })






})