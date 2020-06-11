require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process

const registerUser = require('./register-user')
const { random } = Math
const { expect } = require('chai')
require('books-commons/polyfills/json')
const { errors: { VoidError} } = require('books-commons')
const { mongoose, models: { User } } = require('books-data')
const bcrypt = require('bcryptjs')

describe('server-logic register user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password

    beforeEach(async() => {
        await User.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
    })

    it('should succeed on valid data', async() => {
        const result = await registerUser(name, surname, email, password)

        expect(result).to.be.undefined

        const users = await User.find()

        expect(users.length).to.equal(1)

        const [user] = users

        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)

        const match = await bcrypt.compare(password, user.password)

        expect(match).to.be.true
    })

    describe('when user already exists', () => {
        beforeEach(() => User.create({ name, surname, email, password }))

        it('should fail on trying to register an existing user', async() => {
            try {
                await registerUser(name, surname, email, password)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with e-mail ${email} already exists`)
            }
        })
    })


    describe('Validate fiels sync tests', () => {
        it('should fail on non-string field', () => {
            expect(() => {
                registerUser(undefined, surname, email, password)
            }).to.throw(TypeError, 'undefined is not a string')

            expect(() => {
                registerUser(1, surname, email, password)
            }).to.throw(TypeError, '1 is not a string')

            expect(() => {
                registerUser(true, surname, email, password)
            }).to.throw(TypeError, 'true is not a string')

            expect(() => {
                registerUser(name, undefined, email, password)
            }).to.throw(TypeError, 'undefined is not a string')

            expect(() => {
                registerUser(name, 1, email, password)
            }).to.throw(TypeError, '1 is not a string')

            expect(() => {
                registerUser(name, true, email, password)
            }).to.throw(TypeError, 'true is not a string')
        })
        it('should fail on void field', () => {
            expect(() => {
                registerUser('', surname, email, password)
            }).to.throw(VoidError, 'string is empty or blank')

            expect(() => {
                registerUser(name, '', email, password)
            }).to.throw(VoidError, 'string is empty or blank')

            expect(() => {
                registerUser(name, surname, '', password)
            }).to.throw(VoidError, 'string is empty or blank')

            expect(() => {
                registerUser(name, surname, email, '')
            }).to.throw(VoidError, 'string is empty or blank')

        })

        it('should fail on incorrect email', () => {
            email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}`

            expect(() => {
                registerUser(name, surname, email, password)
            }).to.throw(Error, `${email} is not an e-mail`)
        })

        it('should fail on password minlength of 8', () => {
            password = `123123`

            expect(() => {
                registerUser(name, surname, email, password)
            }).to.throw(Error, `"${password}" length is not greater or equal than 8`)

        })

    })

    afterEach(() => User.deleteMany())

    after (async() => {
        return await mongoose.disconnect();
    })
})