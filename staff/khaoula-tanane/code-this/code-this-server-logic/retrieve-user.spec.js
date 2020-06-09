require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
require('code-this-commons/polyfills/json')
const { mongoose, models: { User } } = require('code-this-data')

describe('logic - retrieve user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, email, password, userId

    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })
    )

    describe('when user already exists', () => {
        beforeEach(() =>
            User.create({ name, email, password })
                .then(user => userId = user.id)
        )

        it('should succeed on correct user id', () =>
            retrieveUser(userId)
                .then(user => {
                    expect(user.name).to.equal(name)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.be.undefined
                    expect(user.cart).to.be.undefined
                    expect(user.order).to.be.undefined
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

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})