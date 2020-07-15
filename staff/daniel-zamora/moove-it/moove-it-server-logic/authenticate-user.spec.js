require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose, models: { User } } = require('moove-it-data')

const authenticateUser = require('./authenticate-user')
const { random } = Math
const { expect } = require('chai')
const { errors: { UnexistenceError, CredentialsError } } = require('moove-it-commons')
const bcrypt = require('bcryptjs')

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
        beforeEach(() => {
            const user = { name, surname, email, password: hash }
            return User.create(user)
                .then(user => userId = user.id)
        })

        it('should succeed on correct credentials', () =>
            authenticateUser(email, password)
            .then(_userId =>
                expect(_userId).to.equal(userId))
        )

        it('should fail on wrong password', () =>
            authenticateUser(email, "123")
            .then(() => { throw new Error("Should not be here") })
            .catch(error => {
                expect(error).to.be.an.instanceOf(CredentialsError)

                expect(error.message).to.equal(`wrong password`)
            })
        )

        it('should fail when incorrect inputs are introduced', () => {
            try {
                authenticateUser(1, password)
            } catch (error) {
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(`1 is not a string`)
            }

            try {
                authenticateUser('', password)
            } catch (error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(` is empty or blank`)
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
                expect(error).to.be.an.instanceof(UnexistenceError)

                expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
            })
        )
    })

    afterEach(() =>
        User.deleteMany()
    )
    after(() => mongoose.disconnect())
})