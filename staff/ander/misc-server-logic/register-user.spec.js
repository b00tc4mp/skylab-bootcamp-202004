require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const registerUser = require('./register-user')
const { random } = Math
const { expect } = require('chai')
require('misc-commons/polyfills/json')
const { mongoose, models: { User } } = require('misc-data')
const bcrypt = require('bcryptjs')

describe('logic - register user', () => {
let name, surname, email, password

before(() =>mongoose.connect(MONGODB_URL))

    beforeEach(() =>
        User.deleteMany()
    beforeEach(() =>
        users.deleteMany()me-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`

            })
    )

    it('should succeed on valid data', () =>
        registerUser(name, surname, email, password)
            .then(() => User.find())
            .then(users => {
                expect(users.length).to.equal(1)

                const [user] = users

                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
            })
    )

    describe('when user already exists', () => {
        beforeEach(() => {
            const user = { name, surname, email, password }

            return users.insertOne(user)
        })

        it('should fail on trying to register an existing user', () =>
            registerUser(name, surname, email, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist

                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with e-mail ${email} already exists`)
                })
        )
    })

    afterEach(() => users.deleteMany())

    after(() => users.deleteMany({}).then(mongo.disconnect))
})