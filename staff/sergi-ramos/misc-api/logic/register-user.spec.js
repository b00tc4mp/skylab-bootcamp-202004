require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const registerUser = require('./register-user')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('../data')
const { errors: { DuplicityError } } = require('misc-commons')

describe('logic - register user', () => {
    let users

    before(() => mongo.connect(MONGODB_URL).then(connection => users = connection.db().collection('users')))

    let name, surname, email, password

    beforeEach(() =>
        users.deleteMany()
            .then(() => {

                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })
    )


    describe('when user does not exists', () => {
        it('should succed when user does not exist', () => {

            registerUser(name, surname, email, password)
                .then(() => {
                    return users.findOne({ email })
                })
                .then(user => {
                    expect(name).to.equal(user.name)
                    expect(surname).to.equal(user.surname)
                    expect(email).to.equal(user.email)
                    expect(password).to.equal(user.password)
                })

        })

    })

    describe('when user already exist', () => {

        beforeEach(() => {
            const user = { name, surname, email, password }
            return users.insertOne(user)

        })

        it('should fail when user already exist', () => {
            registerUser(name, surname, email, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(DuplicityError)
                })
        })

        it('should fail on sync errors', () => {
            const wrongName = 123456789
            expect(() => registerUser(wrongName, surname, email, password)).to.throw(TypeError, `${wrongName} is not a string`)
        })
    })

    afterEach(() => users.deleteMany())
    after(() => users.deleteMany().then(mongo.disconnect))
})

