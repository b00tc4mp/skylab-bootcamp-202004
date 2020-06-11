require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process

const authenticateUser = require('./authenticate-user')
const { random } = Math
const { expect } = require('chai')
require('books-commons/polyfills/json')
const { mongoose, models: { User } } = require('books-data')
const bcrypt = require('bcryptjs')
const { errors: { VoidError} } = require('books-commons')

describe('server-logic authenticate user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash

    beforeEach(() =>
        User.deleteMany()
        .then(() => {
            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`

            return bcrypt.hash(password, 10)
        })
        .then(_hash => hash = _hash)
    )

    describe('when user already exists', () => {
        beforeEach(() =>
            User.create({ name, surname, email, password: hash })
            .then(user => userId = user.id)
        )

        it('should succeed on correct credentials', () =>
            authenticateUser(email, password)
            .then(_userId => expect(_userId).to.equal(userId))
        )

        it('should fail on wrong password', () => {
            password += 'wrong-'

            return authenticateUser(email, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`wrong password`)
                })
        })
    })

    it('should fail when user does not exist', () =>
        authenticateUser(email, password)
        .then(() => { throw new Error('should not reach this point') })
        .catch(error => {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
        })
    )

    describe('Validate fiels sync tests', () => {
        it('should fail on non-string field', () => {
            expect(() => {
                authenticateUser(true, password)
            }).to.throw(TypeError, 'true is not a string')

            expect(() => {
                authenticateUser(email, 12313)
            }).to.throw(TypeError, '12313 is not a string')
        })

        it('should fail on void field', () => {
            expect(() => {
                authenticateUser('', password)
            }).to.throw(VoidError, 'string is empty or blank')

            expect(() => {
                authenticateUser(email, '')
            }).to.throw(VoidError, 'string is empty or blank')

        })

        it('should fail on incorrect email', () => {
            email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}`

            expect(() => {
                authenticateUser(email, password)
            }).to.throw(Error, `${email} is not an e-mail`)
        })

        it('should fail on password minlength of 8', () => {
            password = `123123`

            expect(() => {
                authenticateUser(email, password)
            }).to.throw(Error, `"${password}" length is not greater or equal than 8`)

        })
    })

    afterEach(async() => await User.deleteMany())

    after (async() => {
        return await mongoose.disconnect();
    })
})