require('dotenv').config()

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

    describe('when user already exist', () => {
        beforeEach(() => {
            const user = { name, surname, email, password }

            return users.insertOne(user)
                .then(result => userId = result.insertedId.toString())
        })

        it('should remove the registered user from database', () =>{
            return unregisterUser(userId)
            .then(() => users.find().toArray())
            .then(users => {
                expect(users).to.have.lengthOf(0)
            })
        })
    })

    it('should fail when user does not exists', () => {
        userId = '123455678990'

        return unregisterUser(userId)
        .then(() => { throw new Error('should not reach this point') })
        .catch(error => {
            expect(error).to.be.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        })
    })

    it('should return a type error', () => {
        userId = undefined
        expect( () => {
            unregisterUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = 123
        expect( () => {
            unregisterUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = true
        expect( () => {
            unregisterUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)
    })

    it('should return an error', () => {
        userId = ''
        expect( () => {
            unregisterUser(userId)
        }).to.throw(Error, `${userId} is empty or blank`)

        userId = '    '
        expect( () => {
            unregisterUser(userId)
        }).to.throw(Error, `${userId} is empty or blank`)
    })

    afterEach(() => users.deleteMany({}))

    after(() => users.deleteMany({}).then(mongo.disconnect))
})