require('dotenv').config()

const { env: { MONGODB_URL_TEST, SECRET_TEST: SECRET } } = process

const isUserSessionValid = require('./is-user-session-valid')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
require('gym-commons/ponyfills/xhr')
require('gym-commons/ponyfills/atob')
const { utils: { jwtPromised } } = require('gym-commons')
const { ObjectId } = mongo
const context = require('./context')

context.storage = {}

describe('logic - isUserSessionValid', () => {
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
                    .then(_token => context.storage.token = _token )
            })
    )

    it('should succeed when the user is authenticated and token is not expired', () =>
        isUserSessionValid()
            .then(result => expect(result).to.equal(true))
    )

    it('should fail when the token is expired', () => {
        const _userId = ObjectId().toString()

        return jwtPromised.sign({ sub: _userId }, SECRET)
            .then(_token => context.storage.token = _token)
            .then(() => isUserSessionValid()
                .then(result => expect(result).to.equal(false)))
    })

    afterEach(() => users.deleteMany())

    after(mongo.disconnect)

})