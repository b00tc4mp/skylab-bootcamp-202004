require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const registerUser = require('./register-user')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
const bcrypt = require('bcryptjs')
require('gym-commons/ponyfills/xhr')

describe('logic - register user', () => {
    let users

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => {
            users = connection.db().collection('users')
        }))

    let name, surname, email, password, _name, _surname, _email, _password

    beforeEach(() =>
        users.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })
    )

    it('should succeed on valid data', () =>
        registerUser(name, surname, email, password)
            .then(() => users.find().toArray())
            .then(users => {
                expect(users.length).to.equal(1)

                const [user] = users

                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)

                return bcrypt.compare(password, user.password)
            })
            .then(match => expect(match).to.be.true)
    )

    describe('when user already exists', () => {
        beforeEach(() => users.insertOne({ name, surname, email, password }))

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

    it('should return a type error', () => {
        _name = undefined
        expect( () => {
            registerUser(_name, surname, email, password)
        }).to.throw(TypeError, `${_name} is not a string`)

        _name = 123
        expect( () => {
            registerUser(_name, surname, email, password)
        }).to.throw(TypeError, `${_name} is not a string`)

        _name = true
        expect( () => {
            registerUser(_name, surname, email, password)
        }).to.throw(TypeError, `${_name} is not a string`)

        _surname = undefined
        expect( () => {
            registerUser(name, _surname, email, password)
        }).to.throw(TypeError, `${_surname} is not a string`)

        _surname = 123
        expect( () => {
            registerUser(name, _surname, email, password)
        }).to.throw(TypeError, `${_surname} is not a string`)

        _surname = false
        expect( () => {
            registerUser(name, _surname, email, password)
        }).to.throw(TypeError, `${_surname} is not a string`)

        _password = undefined
        expect( () => {
            registerUser(name, surname, email, _password)
        }).to.throw(TypeError, `${_password} is not a string`)

        _password= 123
        expect( () => {
            registerUser(name, surname, email, _password)
        }).to.throw(TypeError, `${_password} is not a string`)

        _password = false
        expect( () => {
            registerUser(name, surname, email, _password)
        }).to.throw(TypeError, `${_password} is not a string`)
    })

    it('should return an error', () => {
        _email = 'pepito'
        expect( () => {
            registerUser(name, surname, _email, password)
        }).to.throw(Error, `${_email} is not an e-mail`)

        _email= 'peito@mail'
        expect( () => {
            registerUser(name, surname, _email, password)
        }).to.throw(Error, `${_email} is not an e-mail`)

        _email = 'peito.com'
        expect( () => {
            registerUser(name, surname, _email, password)
        }).to.throw(Error, `${_email} is not an e-mail`)

        _password = '123'
        expect( () => {
            registerUser(name, surname, email, _password)
        }).to.throw(Error, `${_password}" length is not greater or equal than 8`)

    })



    afterEach(() => users.deleteMany())

    after(mongo.disconnect)
})