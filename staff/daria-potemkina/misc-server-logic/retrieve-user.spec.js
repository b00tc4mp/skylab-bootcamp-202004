require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('misc-data')


describe('logic - retrieveUser', () => {
    let users

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => users = connection.db().collection('users')))


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

        it('should return the user data', () => {
            return retrieveUser(userId)
                .then(user => {
                    expect(user.password).to.be.undefined
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                })
        })
    })

    it('should fail when user does not exists', () => {
        userId = '123455678990'
        return retrieveUser(userId)
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
            retrieveUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = 123
        expect( () => {
            retrieveUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = true
        expect( () => {
            retrieveUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)
    })

    it('should return an error', () => {
        userId = ''
        expect( () => {
            retrieveUser(userId)
        }).to.throw(Error, `${userId} is empty or blank`)

        userId = '    '
        expect( () => {
            retrieveUser(userId)
        }).to.throw(Error, `${userId} is empty or blank`)
    })

    afterEach(() => users.deleteMany())

    after(() => users.deleteMany().then(mongo.disconnect))
})