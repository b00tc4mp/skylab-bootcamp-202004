require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveUserBalance = require('./retrieve-user-balance')
const { random, round } = Math
const { expect } = require('chai')
const { mongoose, models: { User } } = require('gym-data')

describe('logic - retrieveUserBalance', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let name, surname, email, password, userId, card, balance

    beforeEach(async () => {
        await User.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        card = {
            number: `${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}`,
            holder: `name-${random()} surname-${random()}`,
            expirationDate: new Date(),
            cvv: `${round(random() * 1000)}`,

        }

        balance = {
            guarantee: round(random() * 1000),
            profitAndLoss: round(random() * 1000)
        }
    })

    describe('when user already exist', () => {
        beforeEach(async () => {
            const user = await User.create({ name, surname, email, password, card, balance })
            userId = user._id.toString()
        })

        it('should return the balance data', async () => {
            const result = await retrieveUserBalance(userId)

            const { guarantee, profitAndLoss } = result

            expect(guarantee).to.equal(balance.guarantee)
            expect(profitAndLoss).to.equal(balance.profitAndLoss)

        })
    })

    it('should fail when user does not exists', async () => {
        userId = '123455678990'
        try {
            await retrieveUserBalance(userId)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }

        it('should fail when the the balace is not exist', async () => {
            await User.updateOne({ _id: userId }, { $unset: { card } })

            try {
                await retrieveUserBalance(userId)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal('the balance is empty, there are no operations')
            }
        })
    })

    it('should return a type error', () => {
        userId = undefined
        expect(() => {
            retrieveUserBalance(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = 123
        expect(() => {
            retrieveUserBalance(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = true
        expect(() => {
            retrieveUserBalance(userId)
        }).to.throw(TypeError, `${userId} is not a string`)
    })

    it('should return an error', () => {
        userId = ''
        expect(() => {
            retrieveUserBalance(userId)
        }).to.throw(Error, 'string is empty or blank')

        userId = '    '
        expect(() => {
            retrieveUserBalance(userId)
        }).to.throw(Error, 'string is empty or blank')
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})