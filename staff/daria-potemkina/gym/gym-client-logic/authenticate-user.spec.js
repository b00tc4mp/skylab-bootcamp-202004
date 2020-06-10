require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const authenticateUser = require('./authenticate-user')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
const bcrypt = require('bcryptjs')
require('gym-commons/ponyfills/xhr')
require('gym-commons/ponyfills/atob')

describe('logic - authenticate user', () => {
    let users

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => {
            users = connection.db().collection('users')
        }))

    let name, surname, email, password, userId, hash

    beforeEach(() =>
        users.deleteMany()
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
            users.insertOne({ name, surname, email, password: hash })
                .then(user => userId = user.insertedId.toString())
        )

        it('should succeed on correct credentials', () =>
            authenticateUser(email, password)
                .then(token => {
                    const [, payloadBase64] = token.split('.')

                    const payloadJson = atob(payloadBase64)

                    const payload = JSON.parse(payloadJson)

                    const { sub: _userId } = payload

                    expect(_userId).to.equal(userId)
                })
        )

        it('should fail on wrong password', () => {
            password += 'wrong-'

            return authenticateUser(email, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal('wrong credentials')
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

    it('should return a type error', () => {
        _password = undefined
        expect( () => {
            authenticateUser(email, _password)
        }).to.throw(TypeError, `${_password} is not a string`)

        _password= 123
        expect( () => {
            authenticateUser(email, _password)
        }).to.throw(TypeError, `${_password} is not a string`)

        _password = false
        expect( () => {
            authenticateUser(email, _password)
        }).to.throw(TypeError, `${_password} is not a string`)
    })

    it('should return an error', () => {
        _email = 'pepito'
        expect( () => {
            authenticateUser(_email, password)
        }).to.throw(Error, `${_email} is not an e-mail`)

        _email= 'peito@mail'
        expect( () => {
            authenticateUser(_email, password)
        }).to.throw(Error, `${_email} is not an e-mail`)

        _email = 'peito.com'
        expect( () => {
            authenticateUser(_email, password)
        }).to.throw(Error, `${_email} is not an e-mail`)

        _password = ' '
        expect( () => {
            authenticateUser(email, _password)
        }).to.throw(Error, 'string is empty or blank')

        _password = ''
        expect( () => {
            authenticateUser(email, _password)
        }).to.throw(Error, 'string is empty or blank')
        
    })


    afterEach(() => users.deleteMany())

    after(mongo.disconnect)
})