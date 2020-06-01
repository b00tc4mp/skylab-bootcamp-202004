require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process
const { VoidError } = require('../errors')
const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
require('../utils/polyfills/json')
const { mongo } = require('../data')

describe('logic - retrieve user', () => {
    let users

    before(() => mongo.connect(MONGODB_URL).then(connection => users = connection.db().collection('users')))

    let name, surname, email, password, userId

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
        beforeEach(() => {
            const user = { name, surname, email, password }
        
            return users.insertOne(user)
                .then(result =>userId = result.insertedId.toString())    
        })

        it('should succeed on correct user id', () =>
            retrieveUser(userId)
                .then(user => {
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.be.undefined
                })
        )
    })

    it('should fail when user does not exist', () => {
        const userId = '5ed1204ee99ccf6fae798aef'

        return retrieveUser(userId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            })
    })

    it('should fail when user does not exist with a strange id', () => {
        const userId = '12345'

        return retrieveUser(userId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters")
            })
    })

    it('should fail when id does not match the format', () => {
        let userId = ''

        expect(() => {
            return retrieveUser(userId)
        }).to.throw(VoidError, `${userId} is empty or blank`)

        userId = 1

        expect(() => {
            return retrieveUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)
    })

    afterEach(() => users.deleteMany())

    after(() => users.deleteMany().then(mongo.disconnect))
})