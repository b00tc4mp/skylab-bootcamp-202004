const login = require('./login-user')
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
require('../utils/polyfills/json')
// const { Files: { deleteFilesByExtensionFromDirectory }, uid } = require('../utils')

describe.only('logic - login', () => {

    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password, id

    beforEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`
            id = uid()

            const user = {name, surname, email, password, id}

            fs.writeFile(path.join(data, 'users', `${userId}.json`), JSON.prettify(user), error => {
                if (error) return done(error)

                done()
            })
        })
    })

    it('should succed on login user', done => {
        login(email, password, (error, id) => {
            expect(error).to.be.null

            expect(id).to.exist
            expect(id).to.be.a('string')

            done()
        })
    })
    
})