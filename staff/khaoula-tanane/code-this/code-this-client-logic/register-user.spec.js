require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process

const registerUser = require('./register-user')
const { random } = Math
const { expect } = require('chai')
const context = require('./context')
require('code-this-commons/polyfills/json')
const { mongo } = require('../code-this-data')
const bcrypt = require('bcryptjs')
const { models: { User } } = require('code-this-data')
const { errors: { DuplicityError } } = require('code-this-commons')


context.API_URL = API_URL

describe('logic - register user', () => {
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
                return bcrypt.hash(password, 10)
            }).then(_hash => hash = _hash)
    )

    it('should succeed on valid data', () =>
        registerUser(name, email, password)
            .then(() => users.find().toArray())
            .then(_users => {
                expect(_users.length).to.equal(1)

                const [user] = _users

                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)

                return bcrypt.compare(password, user.password)
            })
            .then(match => expect(match).to.be.true)
    )


    describe('when user already exists', () => {
        beforeEach(() => users.insertOne({ name, email, password: hash }))

        it('should fail on trying to register an existing user', () =>
            registerUser(name, email, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`user with e-mail ${email} already exists`)
                })
        )
    })

    it('should fail when inputs are incorrect', () => {
        expect(() => {
            registerUser(1, email, password)
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            registerUser(name, 'amail.com', password)
        }).to.throw(Error, 'amail.com is not an e-mail')

        expect(() => {
            registerUser(name, email, '123')
        }).to.throw(Error, 'length is not greater or equal than 8')
    })

    afterEach(() => users.deleteMany())

    after(mongo.disconnect)
})