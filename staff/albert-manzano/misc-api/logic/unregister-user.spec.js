equire('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const unregisterUser = require('./unregister-user')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('../data')

describe('logic - unregisterUser', () => {
    let users

    before(() =>
        mongo.connect(MONGODB_URL_TEST)
            .then(connection => users = connection.db().collection('users'))
    )

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

    describe('when user exist', () => {
        beforeEach(() => {
            const user = { name, surname, email, password }

            return users.insertOne(user)
                .then(result => userId = result.insertedId.toString())
        })

        it('should remove user registrered', () =>{
            unregisterUser(userId)
            .then(() => users.find().toArray())
            .then(users => {
                expect(users).to.have.lengthOf(0)
                expect(error).to.be.undefined
            })
        })
    })

    it('should fail when user does not exists', () => {
        userId = '5ed1204ee99ccf6fae798aef'

        unregisterUser(userId)
        .then(() => { throw new Error('should not reach this point') })
        .catch(error => {
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        })
    })

    afterEach(() => users.deleteMany({}))

    after(() => users.deleteMany({}).then(mongo.disconnect))
})