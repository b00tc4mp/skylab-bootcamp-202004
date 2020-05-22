const { random } = Math
const path = require('path')
const fs = require('fs')
const uid = require('../utils/uid')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
require('../utils/json')
const login = require('./login')
const {expect} = require('chai')

describe('logic - login', () => {
    const data = path.join(__dirname, '..', 'data')
    let name, surname, email, password, userId

    beforeEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), ".json", error => {
            debugger
            if (error) return done(error)

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`
            userId = uid()

            const newUser = { name, surname, email, password }

            fs.writeFile(path.join(data,'users', `${userId}.json`), JSON.prettify(newUser), error => {
                if (error) throw new Error(error)

                done()
            })
        })
    })

    it('should succed on login user', done => {
        debugger
        login(email, password, (error, id) => {
            debugger
            expect(error).to.be.null

            expect(id).to.be.a('string')
            done()
        })
    })
    debugger
    afterEach(done => {
        debugger
        deleteFilesByExtensionFromDirectory(path.join(data,'users'),'.json', error => {
            if(error) return done(error)
            done()
        }) 
    })
})



