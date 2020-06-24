require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, SECRET } } = process
debugger
const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
require('aquaponics-commons/polyfills/json')
const { mongoose, models: { User } } = require('aquaponics-data')
const { jwtPromised } = require('aquaponics-node-commons')
global.fetch = require('node-fetch')
const __context__ = require('./context')
const AsyncStorage = require('not-async-storage')
const { API_URL } = require('./context')

__context__.storage = AsyncStorage
__context__.API_URL = API_URL

describe('client-logic-retrieve user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, phone, _password

    beforeEach(async () => {
        await User.deleteMany()
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = 'Iambetho01!'
        phone = random()
        _password = 'Iambetho01!'
    })

    describe('when user already exists', () => {
        beforeEach(async () => {
            const user = await User.create({ name, surname, email, password ,phone})
            userId = user.id
            token = await jwtPromised.sign({ sub: userId }, SECRET)

            await __context__.storage.setItem('token', token)
        })

        it('should succeed on correct user id', async () => {
            const user = await retrieveUser();

            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.password).to.be.undefined
            expect(user.phone).to.equal(phone)
        })
    })

    it('should fail when user does not exist', async () => {
        userId = '5ed1204ee99ccf6fae798aef'

        const _token = await jwtPromised.sign({ sub: userId }, SECRET)
        await __context__.storage.setItem('token', _token)

        try {
            await retrieveUser()
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with ${userId} does not exist`)
        }
    })

    afterEach(async () => await User.deleteMany())

    after(async () => {
        await mongoose.disconnect()
    })
}) 