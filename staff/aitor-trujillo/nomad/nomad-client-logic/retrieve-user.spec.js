require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, SECRET } } = process

const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
require('nomad-commons/polyfills/json')
const { mongoose, models: { User } } = require('nomad-data')
require('nomad-commons/ponyfills/xhr')
global.fetch = require('node-fetch')
const jwtPromised = require('../nomad-api/helpers/jwt-promised')
const context = require('./context')
const bcrypt = require('bcryptjs')

const AsyncStorage = require('not-async-storage')
context.storage = AsyncStorage
context.API_URL = API_URL


describe('client - retrieve user', () => {
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

        it('should succeed on correct user id', () =>
            retrieveUser()
                .then(user => {
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.be.undefined
                })
        )
    })

    describe('when user does not exist', () => {
        let userId

        beforeEach(async () => {
            userId = '5ed1204ee99ccf6fae798aef'

            await jwtPromised.sign({ sub: userId }, SECRET)
                .then(token => context.storage.setItem('token', token))
        })

        it('should fail when user does not exist', () =>
            retrieveUser()
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with id ${userId} does not exist`)
                })
        )
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})