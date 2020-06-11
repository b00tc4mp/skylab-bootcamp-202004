require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const closeUserPosition = require('./close-user-position')
const { round, random } = Math
const { expect } = require('chai')
const { mongoose, models: { User, Product, Price, Contract, AccountBalance } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')
const { ObjectId } = mongoose
const bcrypt = require('bcryptjs')

describe('logic - closeUserPosition', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let user, userId, future, option, futureId, optionId, futurePrice, optionPrice, ___futurePrice, ___optionPrice, contract, futurePriceId, optionPriceId, dateToday

    beforeEach(async () => {
        await User.deleteMany()
        await Product.deleteMany()
        await Contract.deleteMany()
        await AccountBalance.deleteMany()
        await Price.deleteMany()

        user = {
            name: `name-${random()}`,
            surname: `surname-${random()}`,
            email: `e-${random()}@mail.com`,
            password: `password-${random()}`,
            card: {
                number: `${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}`,
                holder: `name-${random()} surname-${random()}`,
                expirationDate: new Date('Janury 23, 2025'),
                cvv: `${round(random() * 1000)}`
            }
        }

        future = {
            productType: 'future',
            ticker: `ticker-${random()}`,
            exchange: `exchange-${random()}`,
            sector: `sector-${random()}`,
            contractSize: round(random() * 100),
            settlementDate: new Date().toString().split(' ').slice(1, 4).join(' '),
        }

        option = {
            productType: 'option',
            exchange: `exchange-${random()}`,
            ticker: `ticker-${random()}`,
            sector: `sector-${random()}`,
            contractSize: round(random() * 100),
            settlementDate: new Date().toString().split(' ').slice(1, 4).join(' '),
            type: {
                strike: 9,
                side: 'call',
            }
        }

        dateToday = new Date().toString().split(' ').slice(1, 4).join(' ')

        const _user = await User.create(user)
        userId = _user._id.toString()

        const product = await Product.create(future)
        futureId = product._id.toString()

        const _option = await Product.create(option)
        optionId = _option._id.toString()

        const _futurePrice = await Price.create({ product: futureId, date: 'Jun 10 2020', price: 10 })
        futurePrice = _futurePrice.price
        futurePriceId = _futurePrice._id.toString()

        const _optionPrice = await Price.create({ product: optionId, date: 'Jun 07 2020', price: 10 })
        optionPrice = _optionPrice.price
        optionPriceId = _optionPrice._id.toString()

        guarantee = round(random() * 1000)
        profitAndLoss = round(random() * 1000)

        contract = {
            user: userId,
            product: futureId,
            trades: [{
                price: futurePriceId,
                type: 'Buy',
                quantity: round(random() * 10)
            }]
        }

        contract = await Contract.create(contract)

        const accountBalance = await AccountBalance.create({ user: userId, date: 'Jun 10 2020', guarantee, profitAndLoss })

        const __futurePrice = await Price.create({ product: futureId, date: dateToday, price: 8 })
        ___futurePrice = __futurePrice.price

        const __optionPrice = await Price.create({ product: optionId, date: dateToday, price: 8 })
        ___optionPrice = __optionPrice.price
    })

    it('should modify the user profits and losses and delete the trades setteled', async () => {
        await closeUserPosition(userId)

        const balance = await AccountBalance.find({user: ObjectId(userId)}).sort({ date: -1 })

        expect(balance).to.be.an('array')
        expect(balance).to.have.lengthOf(2)

        const [_balance] = balance
        
        expect(_balance).to.be.an.instanceOf(Object)
        expect(_balance.user.toString()).to.equal(userId)
        expect(_balance.date).to.equal(dateToday)
        expect(_balance.guarantee).to.equal(guarantee)
        expect(_balance.profitAndLoss).to.equal(round((profitAndLoss + (___futurePrice - futurePrice) * future.contractSize * contract.trades[0].quantity) * 100) / 100)

        const _contract = await Contract.find({ user: ObjectId(userId) })

        expect(_contract).to.have.lengthOf(0)

    })

    afterEach(async () => {
        await User.deleteMany()
        await Product.deleteMany()
        await Contract.deleteMany()
        await AccountBalance.deleteMany()
        await Price.deleteMany()
    })

    after(mongoose.disconnect)

})