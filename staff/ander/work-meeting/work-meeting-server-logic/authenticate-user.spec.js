require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const authenticateUser = require('./authenticate-user')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User } } = require('work-meeting-data')
const bcrypt = require('bcryptjs')

describe('logic - authenticate user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash,_email, _password

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
    it('should return an error when synchronous error exists', () => {
        _email = ''
        expect(() => {
            authenticateUser(_email, password)
        }).to.throw(Error, 'string is empty or blank')

        _email= '    '
        expect(() => {
            authenticateUser(_email, password)
        }).to.throw(Error, 'string is empty or blank')
        
        _password = ''
        expect(() => {
            authenticateUser(email, _password)
        }).to.throw(Error, 'string is empty or blank')

        _password= '    '
        expect(() => {
            authenticateUser(email, _password)
        }).to.throw(Error, 'string is empty or blank')

        _password= undefined
        expect(() => {
            authenticateUser(email, _password)
        }).to.throw(Error, `${_password} is not a string`)

        _password = true
        expect(() => {
            authenticateUser(email, _password)
        }).to.throw(Error, `${_password} is not a string`)

        _email= undefined
        expect(() => { debugger
            authenticateUser(_email, password)
        }).to.throw(Error,`${_email} is not a string` )

        _email = true
        expect(() => {
            authenticateUser(_email, password)
        }).to.throw(Error, `${_email} is not a string`)


    })

    afterEach(() => User.deleteMany())

    after(async ()=> await mongoose.disconnect())
})