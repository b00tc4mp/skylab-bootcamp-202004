require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, SECRET } } = process

const { random } = Math
const { expect } = require('chai')
require('nomad-commons/polyfills/json')
const { mongoose, models: { User } } = require('nomad-data')
require('nomad-commons/ponyfills/xhr')
global.fetch = require('node-fetch')
const jwtPromised = require('../nomad-api/helpers/jwt-promised')
const context = require('./context')
const bcrypt = require('bcryptjs')
const isUserAuthenticated = require('./is-user-authenticated')

const AsyncStorage = require('not-async-storage')
context.storage = AsyncStorage
context.API_URL = API_URL


describe('client - is user authenticated', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, token, encryptedPassword, userId

    beforeEach(async () => {
        await User.deleteMany()
            .then(async () => {
                name = `name-${random()}`;
                surname = `surname-${random()}`;
                email = `email-${random()}@gmail.com`;
                password = `password-${random()}`;
                encryptedPassword = await bcrypt.hash(password, 10);
            })
    })

    describe('when user already exists', () => {
        beforeEach(async () => {
            await User.create({ name, surname, email, password: encryptedPassword })
                .then(({ id }) => {
                    userId = id
                })

            token = await jwtPromised.sign({ sub: userId }, SECRET)
            await context.storage.setItem('token', token)
        })

        it('should succeed on authenticated user', () =>
            isUserAuthenticated()
                .then(result => {
                    expect(result).to.equal(true)
                })
        )
    })

    describe('when user is not authenticated', () => {

        beforeEach(async () => {
            await context.storage.removeItem('token')
        })

        it('should fail when user is not authenticated', () =>
            isUserAuthenticated()
                .then(result => {
                    expect(result).to.equal(false)
                })
        )
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})