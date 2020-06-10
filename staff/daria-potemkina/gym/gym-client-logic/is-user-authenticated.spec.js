require('dotenv').config()

const { env: { MONGODB_URL_TEST, SECRET_TEST: SECRET } } = process

const isUserAuthenticated = require('./is-user-authenticated')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
require('gym-commons/ponyfills/xhr')
require('gym-commons/ponyfills/atob')
const { utils: { jwtPromised } } = require('gym-commons')
const { ObjectId } = mongo

describe('logic - isUserAuthenticate', () => {
    let users

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => {
            users = connection.db().collection('users')
        }))

    let name, surname, email, password, token

    beforeEach(() =>
        users.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`

                return users.insertOne({ name, surname, email, password })
                    .then(user => jwtPromised.sign({ sub: user.insertedId.toString() }, SECRET))
                    .then(_token => token = _token)
            })
    )

    it('should succeed when the user is authenticated and token is not expired', () =>
        isUserAuthenticated(token)
            .then(result => expect(result).to.equal(true))
    )

    it('should fail when the token is expired', () => {
        const _userId = ObjectId().toString()

        return jwtPromised.sign({ sub: _userId }, SECRET)
            .then(_token => token = _token)
            .then(() => isUserAuthenticated(token)
                .then(result => expect(result).to.equal(false)))
    })

    it('should return a type error', () => {
        token = undefined
        expect( () => {
            isUserAuthenticated(token)
        }).to.throw(TypeError, `${token} is not a string`)

        token= 123
        expect( () => {
            isUserAuthenticated(token)
        }).to.throw(TypeError, `${token} is not a string`)

        token = false
        expect( () => {
            isUserAuthenticated(token)
        }).to.throw(TypeError, `${token} is not a string`)
    })

    it('should return an error', () => {
        token = ''
        expect( () => {
            isUserAuthenticated(token)
        }).to.throw(Error, 'string is empty or blank')

        token= '  '
        expect( () => {
            isUserAuthenticated(token)
        }).to.throw(Error, 'string is empty or blank')
    })
})