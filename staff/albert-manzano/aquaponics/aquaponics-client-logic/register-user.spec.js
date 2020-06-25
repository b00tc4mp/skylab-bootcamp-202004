require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process
const registerUser = require('./register-user')
const { random } = Math
const { expect } = require('chai')
require('aquaponics-commons/polyfills/json')
const { mongoose, models: { User } } = require('aquaponics-data')
const bcrypt = require('bcryptjs')
global.fetch = require('node-fetch')
const context = require('./context')
const AsyncStorage = require('not-async-storage')
const { API_URL } = require('./context')

context.__storage__ = AsyncStorage
context.API_URL = API_URL


describe('logic - register user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, role, phone, _password

    beforeEach(async () => {
        await User.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `Iambetho01!`
        phone = random()
        _password = 'Iambetho01!'

    })

    it('should succeed on valid data', async () => {
        const result = await registerUser(name, surname, email, password, _password, phone)

        expect(result).to.be.undefined
        const users = await User.find()

        expect(users.length).to.equal(1)

        const [user] = users
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.phone).to.equal(phone)

        const match = await bcrypt.compare(password, user.password)
        expect(match).to.be.true

    })

    describe('when user already exists', () => {
        beforeEach(() => User.create({ name, surname, email, password, _password, phone }))

        it('should fail on trying to register an existing user', () =>
            registerUser(name, surname, email, password, _password, phone)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with e-mail ${email} already exists`)
                })
        )
    })

    describe('when inputs are not fitting what is expected', () => {
        beforeEach(() => {
            it('should fail on wrong input', () => {
                expect(() => {
                    registerUser(true, surname, email, password, _password, phone)
                }).to.throw(TypeError, `true is not a string`)

                expect(() => {
                    registerUser(undefined, surname, email, password, _password, phone)
                }).to.throw(TypeError, `${undefined} is not a string`)

                expect(() => {
                    registerUser(9, surname, email, password, _password, phone)
                }).to.throw(TypeError, `${9} is not a string`)

                expect(() => {
                    registerUser(name, true, email, password, _password, phone)
                }).to.throw(TypeError, `${true} is not a string`)

                expect(() => {
                    registerUser(name, undefined, email, password, _password, phone)
                }).to.throw(TypeError, `${undefined} is not a string`)

                expect(() => {
                    registerUser(name, 9, email, password, _password, phone)
                }).to.throw(TypeError, `${9} is not a string`)

                expect(() => {
                    registerUser(name, surname, true, password, _password, phone)
                }).to.throw(TypeError, `${true} is not a string`)

                expect(() => {
                    registerUser(name, surname, undefined, password, _password, phone)
                }).to.throw(TypeError, `${undefined} is not a string`)

                expect(() => {
                    registerUser(name, surname, 9, password, _password, phone)
                }).to.throw(TypeError, `${9} is not a string`)

                expect(() => {
                    registerUser(name, surname, email, true, _password, phone)
                }).to.throw(TypeError, `${true} is not a string`)

                expect(() => {
                    registerUser(name, surname, email, undefined, _password, phone)
                }).to.throw(TypeError, `${undefined} is not a string`)

                expect(() => {
                    registerUser(name, surname, email, 9, _password, phone)
                }).to.throw(TypeError, `${9} is not a string`)

                expect(() => {
                    registerUser(name, surname, email, password, true, phone)
                }).to.throw(TypeError, `${true} is not a string`)

                expect(() => {
                    registerUser(name, surname, email, password, undefined, phone)
                }).to.throw(TypeError, `${undefined} is not a string`)

                expect(() => {
                    registerUser(name, surname, email, password, 9, phone)
                }).to.throw(TypeError, `${9} is not a string`)

                expect(() => {
                    registerUser(name, surname, email, password, _password, "phone")
                }).to.throw(TypeError, `phone is not a number`)

                expect(() => {
                    registerUser(name, surname, email, password, _password, true)
                }).to.throw(TypeError, `${true} is not a number`)

                expect(() => {
                    registerUser(name, surname, email, password, _password, undefined)
                }).to.throw(TypeError, `${undefined} is not a number`)
            })
        })
        afterEach(async () => await User.deleteMany())

        after(async () => await mongoose.disconnect)
    })
})