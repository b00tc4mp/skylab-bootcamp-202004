require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL } } = process

const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
require('escape-me-commons/polyfills/json')
const { mongo } = require('escape-me-data')
require('escape-me-commons/ponyfills/xhr')
const { utils: { jwtPromised } } = require('escape-me-node-commons')
const context = require('./context')
const bcrypt = require('bcryptjs')

context.API_URL = API_URL

describe('logic - retrieve user', () => {
    let users

    before(() =>
        mongo.connect(MONGODB_URL)
            .then(connection => users = connection.db().collection('users'))
    )

    let name, surname, email, password, token, participated, following, pending, favorites

    beforeEach(() =>
        users.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                username = `${name}${surname}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                participated = []
                following = []
                pending = []
                favorites = []

                return bcrypt.hash(password, 10)
            })
            .then(_hash => hash = _hash)
    )

    describe('when user already exists', () => {
        beforeEach(() =>
            users.insertOne({ name, surname, email, username, password: hash, participated, following, pending, favorites })
                .then(_user => jwtPromised.sign({ sub: _user.insertedId.toString() }, SECRET))
                .then(_token => token = _token)
        )

        it('should succeed on correct user id', () =>
            retrieveUser(token)
                .then(user => {
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.username).to.equal(username)
                    expect(user.email).to.equal(email)
                    expect(user['participated']).to.be.an.instanceOf(Array)
                    expect(user['pending']).to.be.an.instanceOf(Array)
                    expect(user['favorites']).to.be.an.instanceOf(Array)
                    expect(user['following']).to.be.an.instanceOf(Array)
                    expect(user['participated'].length).to.equal(0)
                    expect(user['pending'].length).to.equal(0)
                    expect(user['favorites'].length).to.equal(0)
                    expect(user['following'].length).to.equal(0)
                    expect(user.password).to.be.undefined
                })
        )
    })

    describe('when user does not exist', () => {
        let userId

        beforeEach(() => {
            userId = '5ed1204ee99ccf6fae798aef'

            return jwtPromised.sign({ sub: userId }, SECRET)
                .then(_token => token = _token)
        })

        it('should fail when user does not exist', () =>
            retrieveUser(token)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with id ${userId} does not exist`)
                })
        )
    })

    it('should fail if token is not a string', () => {
        expect(() => {
            retrieveUser(1)
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            retrieveUser(true)
        }).to.throw(TypeError, 'true is not a string')

    })

    afterEach(() => users.deleteMany())

    after(mongo.disconnect)
})