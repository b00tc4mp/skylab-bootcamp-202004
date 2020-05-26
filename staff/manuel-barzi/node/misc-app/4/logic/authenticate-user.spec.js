const authenticateUser = require('./authenticate-user')
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
require('../utils/polyfills/json')
const { Files: { deleteFilesByExtensionFromDirectory }, uid } = require('../utils')

describe('logic - authenticate user', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password, userId

    beforeEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`

            done()
        })
    })

    describe('when user already exists', () => {
        beforeEach(done => {
            userId = uid()

            const user = { name, surname, email, password, id: userId }

            fs.writeFile(path.join(data, 'users', `${userId}.json`), JSON.prettify(user), error => {
                if (error) return done(error)

                done()
            })
        })

        it('should succeed on correct credentials', done => {
            authenticateUser(email, password, (error, _userId) => {
                expect(error).to.be.null
    
                expect(_userId).to.equal(userId)

                done()
            })
        })

        it('should fail on wrong password', done => {
            password += 'wrong-'

            authenticateUser(email, password, error => {
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`wrong password`)
    
                done()
            })
        })
    })

    it('should fail when user does not exist', done => {
        authenticateUser(email, password, error => {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with e-mail ${email} does not exist`)

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