require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
require('code-this-commons/polyfills/json')
require('code-this-commons/ponyfills/xhr')
const { mongo } = require('../code-this-data')

describe('logic - retrieve user', () => {
    let users

    before(() => mongo.connect(MONGODB_URL).then(connection => users = connection.db().collection('users')))

    let name, email, password, userId

    beforeEach(() =>
        users.deleteMany()
            .then(() => {
                name = `name-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })
    )

    describe('when user already exists', () => {
        beforeEach(() => {
            const user = { name, email, password }

            return users.insertOne(user)
                .then(result => userId = result.insertedId.toString())
        })

        it('should succeed on correct user id', () =>
            retrieveUser(userId)
                .then(user => {
                    expect(user.name).to.equal(name)
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

    afterEach(() => users.deleteMany())

    after(() => users.deleteMany().then(mongo.disconnect))
})