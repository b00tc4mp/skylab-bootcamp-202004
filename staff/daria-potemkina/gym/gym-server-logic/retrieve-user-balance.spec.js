require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveUserBalance = require('./retrieve-user-balance')
const { random, round } = Math
const { expect } = require('chai')
const { mongoose, models: { User, AccountBalance } } = require('gym-data')
const {errors: { UnexistenceError}} = require('gym-commons')

describe('logic - retrieveUserBalance', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let name, surname, email, password, userId, card, guarantee, profitAndLoss, accountId, dateToday

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

        dateToday = new Date()
    })

    describe('when user already exist', () => {
        beforeEach(async () => {
            const user = await User.create({ name, surname, email, password, card })
            userId = user._id.toString()

            const accountBalance = await AccountBalance.create({ user: userId, date: dateToday, guarantee, profitAndLoss })
            accountId = accountBalance._id.toString()
        })

        it('should return the balance data', async () => {
            const result = await retrieveUserBalance(userId)

            expect(result).to.be.an('array')
            expect(result).to.have.lengthOf(1)

            expect(result[0].user).to.be.undefined
            expect(result[0]._id).to.be.undefined
            expect(result[0].__v).to.be.undefined

            const { date, guarantee: _guarantee, profitAndLoss: _profitAndLoss } = result[0]

            expect(date).to.be.an.instanceOf(Date)
            expect(_guarantee).to.equal(guarantee)
            expect(_profitAndLoss).to.equal(profitAndLoss)
        })
        it('should fail when user does not exists', async () => {
            const _userId = '123455678990'
            try {
                await retrieveUserBalance(_userId)
    
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${_userId} does not exist`)
            }
    
        })
        it('should fail when the the balace is not exist', async () => {
            await AccountBalance.deleteMany()
            let _error;
            try {
                await retrieveUserBalance(userId)
    
                throw new Error('should not reach this point')
            } catch (error) {
                _error = error
            }
    
            expect(_error).to.be.exist
            expect(_error).to.be.an.instanceOf(UnexistenceError)
            expect(_error.message).to.equal('the balance is empty, there are no operations yet')
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