require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL } } = process
const { mongoose, models: { User } } = require('moove-it-data')
global.XMLHttpRequest = require('xhr2')

const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const { utils: { jwtPromised } } = require('moove-it-commons')
const context = require('./context')

context.API_URL = API_URL
context.storage = {}

describe('logic - retrieve user', () => {

    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, hash

    beforeEach(() => 
        User.deleteMany()
        .then(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        return bcrypt.hash(password, 10)
            .then(_hash => hash = _hash)
    })
    )


    describe('when user already exists', () => {
        beforeEach(() =>
            User.create({ name, surname, email, password: hash })
            .then(user => jwtPromised.sign({ sub: user.id }, SECRET))
            .then(token => context.storage.token = token)
        )
        it('should succeed on correct token', () => { debugger

            return retrieveUser()
                .then(user => {
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                })

        })

        it('should fail on wrong token format', () =>{
            context.storage.token = "000";
            return retrieveUser()
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`jwt malformed`)
            })
        })

    })

    describe('when user does not exist', () => {
        let userId

        beforeEach(() => {
            userId = '5ed1204ee99ccf6fae798aef'

            return jwtPromised.sign({ sub: userId }, SECRET)
                .then(token => context.storage.token = token)
        })

        it('should fail when user does not exist', () =>
            retrieveUser()
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with id ${userId} does not exist`)
                })
        )
    })

        describe('Sync errors', () => 
            it('should fail when incorrect inputs are introduced', () => {
            try {
                retrieveUser(1)
            } catch (error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`1 is not a string`)
            }

            try {
                retrieveUser('')
            } catch (error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(` is empty or blank`)
            }
        })
    )


    afterEach(() => User.deleteMany())
    after(() => mongoose.disconnect())

})