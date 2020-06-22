require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process

const loginUser = require('./login-user')
const { random } = Math
const { expect } = require('chai')
require('aquaponics-commons/polyfills/json')
const { mongoose, models: { User } } = require('aquaponics-data')
const bcrypt = require('bcryptjs')
require('aquaponics-commons/ponyfills/xhr')
require('aquaponics-commons/ponyfills/atob')
const AsyncStorage = require('not-async-storage')
const logic = require('.')
const { API_URL } = require('./context')
global.fetch = require('node-fetch')

logic.__context__.API_URL = API_URL
logic.__context__.storage = AsyncStorage


describe('logic - authenticate user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash,phone

    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                phone = random()

                return bcrypt.hash(password, 10)
            })
            .then(_hash => hash = _hash)
    )

    describe('when user already exists', () => {
        beforeEach(() =>
            User.create({ name, surname, email, password: hash,phone })
                .then(user => userId = user.id)
        )

        it('should succeed on correct credentials', () =>
            loginUser(email, password)
                .then(() => {
                    logic.__context__.storage.getItem('token')
                    .then(token=>{
                        debugger
                        const [, payloadBase64] = token.split('.')
    
                        const payloadJson = atob(payloadBase64)
    
                        const payload = JSON.parse(payloadJson)
    
                        const { sub: _userId } = payload
    
                        expect(_userId).to.equal(userId)

                    })
                })
        )

        it('should fail on wrong password', () => {
            password += 'wrong-'

            return loginUser(email, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`wrong password`)
                })
        })
    })

    it('should fail when user does not exist', () =>
        loginUser(email, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
            })
    )

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})