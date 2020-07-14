require('dotenv').config()

const { env: { MONGODB_URL_TEST, TEST_API_URL: API_URL, SECRET_TEST: SECRET } } = process

const isUserLoggedIn = require('./is-user-logged-in')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
require('gym-commons/ponyfills/xhr')
const { utils: { jwtPromised } } = require('gym-commons')
const context = require('./context')

context.API_URL = API_URL
context.storage = {}

describe('logic - isUserLoggedIn', () => {
    let users

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => {
            users = connection.db().collection('users')
        }))

    let name, surname, email, password

    beforeEach(() =>
        users.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`

                return users.insertOne({ name, surname, email, password })
                    .then(user => jwtPromised.sign({ sub: user.insertedId.toString() }, SECRET))
                    .then(_token => context.storage.token = _token)
            })
    )
    it('should return true when user is logged in', () => {
        const result = isUserLoggedIn()
        expect(result).to.be.true;
    })

    it('should return false if the user is not logged in,', () => {
        context.storage.token = undefined

        const result = isUserLoggedIn()
        expect(result).to.equal(false)
    })


    afterEach(() => users.deleteMany())

    after(mongo.disconnect)
})
