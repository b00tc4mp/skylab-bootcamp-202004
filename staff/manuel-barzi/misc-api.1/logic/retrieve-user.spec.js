const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
require('../utils/polyfills/json')
const { users: { deleteMany, create } } = require('../data')

describe('logic - retrieve user', () => {
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
        const userId = 'unexisting'

        retrieveUser(userId, error => {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)

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