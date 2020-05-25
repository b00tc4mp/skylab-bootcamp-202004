const retrieveUser = require('./retrieve-user')
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
require('../utils/polyfills/json')
const { Files: { deleteFilesByExtensionFromDirectory }, uid } = require('../utils')

describe('logic - retrieve user', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password, userId

    beforeEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`

            userId = uid()

            done()
        })
    })

    describe('when user already exists', () => {
        beforeEach(done => {
            const user = { name, surname, email, password, id: userId }

            fs.writeFile(path.join(data, 'users', `${userId}.json`), JSON.prettify(user), error => {
                if (error) return done(error)

                done()
            })
        })

        it('should succeed on correct user id', done => {
            retrieveUser(userId, (error, user) => {
                expect(error).to.be.null

                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.be.undefined

                done()
            })
        })

        it('should fail on wrong user id', done => {
            userId += 'wrong-'

            retrieveUser(userId, error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)

                done()
            })
        })
    })

    it('should fail when user does not exist', done => {
        retrieveUser(userId, error => {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)

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