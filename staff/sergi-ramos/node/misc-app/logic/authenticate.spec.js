const { random } = Math
const path = require('path')
const fs = require('fs')
const uid = require('../utils/uid')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
const authenticate = require('./authenticate')
const { expect } = require('chai')
require('../utils/json')

describe('logic - authenticate-user', () => {
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

            const newUser = { name, surname, email, password, userId }

            fs.writeFile(path.join(data, 'users', `${userId}.json`), JSON.prettify(newUser), error => {
                if (error) throw new Error(error)

                done()
            })
        })
    })
    describe('should succed on login user', () => {

        it('should succed on login user', done => {

            authenticate(email, password, (error, id) => {

                expect(error).to.be.null

                expect(id).to.be.a('string')
                done()
            })
        })
    })


    it('should fail when email does not exist', done => {
    const _email = `${random()}@email.com`
        authenticate(_email, '123123123', (error, id) => {
            expect(error.message).to.equal(`User with e-mail ${_email} does not exists`)
            expect(id).to.be.undefined
            expect(error).to.be.an.instanceOf(Error)
            done()
        })
    })


    it("Should throw an error when called with incorrect parameters", () => {
        
        expect(() => { authenticate(undefined, password, () => { }) }).to.throw(Error, (undefined + " is not an e-mail"))
        expect(() => { authenticate(email, undefined, () => { }) }).to.throw(TypeError, (undefined + " is not a string"))
        expect(() => { authenticate(email, password, undefined) }).to.throw(TypeError, (undefined + " is not a function"))

        
    })
    it('should fail on wrong credentials', done => {

        authenticate(email, "password", (error, id) => {
            expect(error.message).to.equal('wrong credentials')
            done()
        })
    })

    afterEach(done => {

        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)
            done()
        })
    })
})



