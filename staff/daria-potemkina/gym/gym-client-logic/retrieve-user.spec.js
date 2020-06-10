require('dotenv').config()

const { env: { MONGODB_URL_TEST, SECRET_TEST: SECRET } } = process

const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
require('gym-commons/polyfills/json')
const { mongo } = require('gym-data')
const { ObjectId } = mongo
const { utils: { jwtPromised } } = require('gym-commons')


describe('logic - retrieve user', () => {
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
            })
    )

    describe('when user already exists', () => {
        beforeEach(() =>
            users.insertOne({ name, surname, email, password })
                .then(user => jwtPromised.sign({ sub: user.insertedId.toString() }, SECRET))
                .then(_token => token = _token)
        )

        it('should succeed on correct user id', () =>
            retrieveUser(token)
                .then(user => {
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.be.undefined
                })
        )
    })

    it('should fail when user does not exist', () => {
        const _userId = ObjectId().toString()

        return jwtPromised.sign({ sub: _userId }, SECRET)
            .then(_token => token = _token)
            .then(() =>
                retrieveUser(token)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.exist

                        expect(error).to.be.an.instanceof(Error)
                        expect(error.message).to.equal(`user with id ${_userId} does not exist`)
                    })

            )
    })

    it('should return a type error', () => {
        token = undefined
        expect( () => {
            retrieveUser(token)
        }).to.throw(TypeError, `${token} is not a string`)

        token= 123
        expect( () => {
            retrieveUser(token)
        }).to.throw(TypeError, `${token} is not a string`)

        token = false
        expect( () => {
            retrieveUser(token)
        }).to.throw(TypeError, `${token} is not a string`)
    })

    it('should return an error', () => {
        token = ''
        expect( () => {
            retrieveUser(token)
        }).to.throw(Error, 'string is empty or blank')

        token= '  '
        expect( () => {
            retrieveUser(token)
        }).to.throw(Error, 'string is empty or blank')
    })

    afterEach(() => users.deleteMany())

    after(mongo.disconnect)
})