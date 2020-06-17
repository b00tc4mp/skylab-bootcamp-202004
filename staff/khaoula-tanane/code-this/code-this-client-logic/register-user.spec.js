require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process

const registerUser = require('./register-user')
const { random } = Math
const { expect } = require('chai')
const context = require('./context')
require('code-this-commons/polyfills/json')
const { mongo } = require('../code-this-data')
context.API_URL = API_URL
const bcrypt = require('bcryptjs')

describe.only('logic - register user', () => {
    let users

    before(() =>
        mongo.connect(MONGODB_URL)
            .then(connection => users = connection.db().collection('users'))
    )

    let name, email, password

    beforeEach(() =>
        users.deleteMany()
            .then(() => {
                name = `name-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`

            })
    )

    it('should succeed on valid data', () =>
        registerUser(name, email, password)
            .then(() => users.find().toArray())
            .then(users => {
                expect(users.length).to.equal(1)

                const [user] = users

                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                return bcrypt.compare(password, user.password)
                
            })
            .then(match => expect(match).to.be.true)
    )

    describe('when user already exists', () => {
        beforeEach(() => {
            const user = { name, email, password }

            return users.insertOne(user)
        })

        it('should fail on trying to register an existing user', () =>
            registerUser(name, email, password)
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