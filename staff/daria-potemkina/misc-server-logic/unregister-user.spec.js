require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const unregisterUser = require('./unregister-user')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { User } } = require('misc-data')

describe('logic - unregisterUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let name, surname, email, password, userId

    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })
    )

    describe('when user already exist', () => {
        beforeEach(() => {
            return User.create({name, surname, email, password})
                .then(user => userId = user._id.toString())
        })

        it('should remove the registered user from database', () => {
            return unregisterUser(userId)
                .then(() => User.find())
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
        expect(() => {
            unregisterUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = 123
        expect(() => {
            unregisterUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = true
        expect(() => {
            unregisterUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)
    })

    it('should return an error', () => {
        userId = ''
        expect(() => {
            unregisterUser(userId)
        }).to.throw(Error, `${userId} is empty or blank`)

        userId = '    '
        expect(() => {
            unregisterUser(userId)
        }).to.throw(Error, `${userId} is empty or blank`)
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})