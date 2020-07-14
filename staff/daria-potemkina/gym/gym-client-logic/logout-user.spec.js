require('dotenv').config()

const { env: { MONGODB_URL_TEST, TEST_API_URL: API_URL, SECRET_TEST: SECRET } } = process

const logoutUser = require('./logout-user')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
require('gym-commons/ponyfills/xhr')
const { utils: { jwtPromised } } = require('gym-commons')
const context = require('./context')

context.API_URL = API_URL
context.storage = {}

describe('logic - logoutUser', () => {
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
    it('should remove the token', () => {
        logoutUser()
        expect(context.storage.token).to.be.undefined;
    })

    afterEach(() => users.deleteMany())

    after(mongo.disconnect)
})
