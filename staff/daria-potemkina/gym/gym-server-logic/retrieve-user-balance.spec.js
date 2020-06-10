require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveUserBalance = require('./retrieve-user-balance')
const { random, round } = Math
const { expect } = require('chai')
const { mongoose, models: { User, AccountBalance } } = require('gym-data')

describe('logic - retrieveUserBalance', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let name, surname, email, password, userId, card, guarantee, profitAndLoss, accountId

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

        guarantee = round(random() * 1000)
        profitAndLoss = round(random() * 1000)
    })

    describe('when user already exist', () => {
        beforeEach(async () => {
            const user = await User.create({ name, surname, email, password, card })
            userId = user._id.toString()

            const accountBalance = AccountBalance.create({ user: userId, date: new Date(), guarantee, profitAndLoss })
            accountId = (await accountBalance)._id.toString()
        })

        it('should return the balance data', async () => {
            const result = await retrieveUserBalance(userId)

            expect(result).to.be.an('array')
            expect(result).to.have.lengthOf(1)

            const { user, date, guarantee: _guarantee, profitAndLoss: _profitAndLoss } = result[0]

            expect(user.toString()).to.equal(userId)
            expect(date).to.be.an.instanceOf(Date)
            expect(_guarantee).to.equal(guarantee)
            expect(_profitAndLoss).to.equal(profitAndLoss)
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
            await AccountBalance.deleteMany()

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