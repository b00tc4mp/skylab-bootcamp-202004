require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, JWT_SECRET } } = process

const retrieveUser = require('./retrieve-user')

const jwtPromised = require('jsonwebtoken')
global.fetch = require('node-fetch')
const notAsyncStorage = require('not-async-storage')
const logic = require('.')
const atob = require('atob')


const { random } = Math
const { expect } = require('chai')
require('coohappy-commons/polyfills/json')
const { mongoose, models: { User } } = require('coohappy-data')

describe('logic - retrieve user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId

    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })

    )

    describe('when user already exists', () => {
        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => userId = user.id)
                .then(() => jwtPromised.sign({ sub: userId }, JWT_SECRET))
                .then(token => logic.__context__.storage.setItem('TOKEN', token))
        )

        it('should succeed on correct user id', () =>
            retrieveUser()
                .then(user => {
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.be.undefined
                    expect(user.cart).to.be.undefined
                    expect(user.order).to.be.undefined
                })
        )
    })

    it('should fail when user does not exist', () => {
        const userId = '5ed1204ee99ccf6fae798aef';
            (async () => {

                const token =  jwtPromised.sign({ sub: userId }, JWT_SECRET)

                await logic.__context__.storage.setItem('TOKEN', token)
            })()

        return retrieveUser()
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            })
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})