require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { User } } = require('gym-data')

describe('logic - retrieveUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let name, surname, email, password, userId

    beforeEach(async () => {
        await User.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
    })

    describe('when user already exist', () => {
        beforeEach(async () => {
            const user = await User.create({ name, surname, email, password })
            userId = user._id.toString()
        })

        it('should return the user data', async () => {
            const result = await retrieveUser(userId)

            expect(result.name).to.equal(name)
            expect(result.surname).to.equal(surname)
            expect(result.email).to.equal(email)
            expect(result.password).to.be.undefined
            expect(result.card).to.be.undefined
            expect(result.products).to.be.undefined
            expect(result.guarantee).to.be.undefined
        })
    })

    it('should fail when user does not exists', async () => {
        userId = '123455678990'
        try {
            await retrieveUser(userId)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })

    it('should return a type error', () => {
        userId = undefined
        expect(() => {
            retrieveUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = 123
        expect(() => {
            retrieveUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = true
        expect(() => {
            retrieveUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)
    })

    it('should return an error', () => {
        userId = ''
        expect(() => {
            retrieveUser(userId)
        }).to.throw(Error, 'string is empty or blank')

        userId = '    '
        expect(() => {
            retrieveUser(userId)
        }).to.throw(Error, 'string is empty or blank')
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})