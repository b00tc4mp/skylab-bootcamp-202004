require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const { mongoose, models: { User } } = require('moove-it-data')
global.XMLHttpRequest = require('xhr2')

// const { errors: { DuplicityError, CredentialsError } } = require('moove-it-commons')
const authenticateUser = require('./authenticate-user')
const { random } = Math
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const context = require('./context')
require('moove-it-commons/polyfills/atob')

context.API_URL = API_URL
context.storage = {}

describe('logic - authenticate user', () => {

    before(() =>
        mongoose.connect(MONGODB_URL).then(User.deleteMany())
    )
    let name, surname, email, password, userId, hash

    beforeEach(() => {

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        return bcrypt.hash(password, 10)
            .then(_hash => hash = _hash)
    })

    describe('when user already exists', () => {
        debugger
        beforeEach(() => {
            const user = { name, surname, email, password: hash }
            User.create(user)
                .then(user => userId = user.id)
        })

        it('should succeed on correct credentials', () =>
        authenticateUser(email, password)
            .then(() => {

                const { token } = context.storage
                
                const [, payloadBase64] = token.split('.')

                const payloadJson = atob(payloadBase64)

                const payload = JSON.parse(payloadJson)

                const { sub: _userId } = payload

                expect(_userId).to.equal(userId)
            })
    )
        it('should succeed on correct credentials', () =>
            authenticateUser(email, password)
            .then(() => {
                const { token } = context.storage

                expect(token).to.exist
            })
        )

        it('should fail on wrong password', () =>
            authenticateUser(email, "123")
            .then(() => { throw new Error("Should not be here") })
            .catch(error => {
                expect(error).to.be.an.instanceOf(Error)

                expect(error.message).to.equal(`wrong password`)
            })
        )

        it('should fail when incorrect inputs are introduced', () => {
            try {
                authenticateUser(1, password)
            } catch (error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`1 is not an e-mail`)
            }

            try {
                authenticateUser('', password)
            } catch (error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(` is not an e-mail`)
            }

            try {
                authenticateUser(email, 1)
            } catch (error) {
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(`1 is not a string`)
            }

            try {
                authenticateUser(email, '')
            } catch (error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(` is empty or blank`)
            }
        })
    })

    describe('when user does not exist', () => {
        it('should fail when user does not exist', () =>
            authenticateUser(email, password)
            .then(() => { throw new Error("Should throw error") })
            .catch(error => {
                expect(error).to.be.an.instanceof(Error)

                expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
            })
        )
    })

    afterEach(() =>
        User.deleteMany()
    )
    after(() => mongoose.disconnect())
})