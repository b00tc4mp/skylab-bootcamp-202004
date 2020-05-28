const authenticateUser = require('./authenticate-user')
const { random } = Math
const { expect } = require('chai')
require('../utils/polyfills/json')
const { users: { deleteMany, create } } = require('../data')

describe('logic - authenticate user', () => {
    let name, surname, email, password, userId

    beforeEach(done => {
        deleteMany(error => {
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
            const user = { name, surname, email, password }

            create(user, (error, id) => {
                if (error) return done(error)

                userId = id

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
        deleteMany(error => {
            if (error) return done(error)

            done()
        })
    })
})