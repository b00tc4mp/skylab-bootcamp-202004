const registerUser = require('./register-user')
const { random } = Math
const { expect } = require('chai')
require('../utils/polyfills/json')
const { users: { deleteMany, create, find } } = require('../data')

describe('logic - register user', () => {
    let name, surname, email, password

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

    it('should succeed on valid data', done => {
        registerUser(name, surname, email, password, error => {
            expect(error).to.be.null

            find({}, (error, users) => {
                if (error) return done(error)

                expect(users.length).to.equal(1)

                const [user] = users

                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)

                done()
            })
        })
    })

    describe('when user already exists', () => {
        beforeEach(done => {
            const user = { name, surname, email, password }

            create(user, error => {
                if (error) return done(error)

                done()
            })
        })

        it('should fail on trying to register an existing user', done => {
            registerUser(name, surname, email, password, error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with e-mail ${email} already exists`)

                done()
            })
        })
    })

    afterEach(done => {
        deleteMany(error => {
            if (error) return done(error)

            done()
        })
    })
})