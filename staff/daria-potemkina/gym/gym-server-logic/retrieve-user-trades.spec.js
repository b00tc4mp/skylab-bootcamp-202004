require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveUserTrades = require('./retrieve-user-trades')
const { random, round } = Math
const { expect } = require('chai')
const { mongoose, models: { User, Contract, Product, Price } } = require('gym-data')
const { ObjectId } = mongoose

describe('logic - retrieveUserTrades', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let user, future, option, userId, futureId, optionId, priceId, optionPriceId, dateToday

    beforeEach(async () => {
        await User.deleteMany()
        await Contract.deleteMany()
        await Product.deleteMany()
        await Price.deleteMany()

        user = {
            name: `name-${random()}`,
            surname: `surname-${random()}`,
            email: `e-${random()}@mail.com`,
            password: `password-${random()}`,
            card: {
                number: `${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}`,
                holder: `name-${random()} surname-${random()}`,
                expirationDate: new Date(),
                cvv: `${round(random() * 1000)}`,
            }
        }

        future = {
            productType: 'future',
            ticker: `ticker-${random()}`,
            exchange: `exchange-${random()}`,
            sector: `sector-${random()}`,
            contractSize: round(random() * 100),
            settlementDate: 'September 18 2020'
        }

        option = {
            productType: 'option',
            exchange: `exchange-${random()}`,
            ticker: `ticker-${random()}`,
            sector: `sector-${random()}`,
            contractSize: round(random() * 100),
            settlementDate: 'June 19 2020',
            type: {
                strike: round(random() * 10),
                side: 'call',
            }
        }

        dateToday = new Date()

        quantity = quantity = round(random() * 10)
    })

    describe('when user already exist', () => {
        beforeEach(async () => {
            const _user = await User.create(user)
            userId = _user._id.toString()

            const product = await Product.create(future)
            futureId = product._id.toString()

            const _option = await Product.create(option)
            optionId = _option._id.toString()

            price = await Price.create({ product: futureId, date: dateToday, price: round(random() * 100) / 100 })
            priceId = price._id.toString()

            optionPrice = await Price.create({ product: optionId, date: dateToday, price: round(random() * 100) / 100 })
            optionPriceId = optionPrice._id.toString()

            futureContract = {
                user: userId,
                product: futureId,
                isValid: true,
                trades: [{
                    price: priceId,
                    type: 'Buy',
                    quantity: round(random() * 10)
                }]
            }

            optionContract = {
                user: userId,
                product: optionId,
                isValid: true,
                trades: [{
                    price: optionPriceId,
                    type: 'Sell',
                    quantity: round(random() * 10)
                }]
            }

            await Contract.create(futureContract)
            await Contract.create(optionContract)
        })

        it('shoud return the user contracts with trades', async () => {
            const results = await retrieveUserTrades(userId)

            expect(results).to.be.an('array')
            expect(results).to.have.lengthOf(2)

            const [_future, _option] = results

            expect(_future.product.productType).to.equal('future')
            expect(_future.product.ticker).to.equal(future.ticker)
            expect(_future.product.exchange).to.equal(future.exchange)
            expect(_future.product.sector).to.equal(future.sector)
            expect(_future.product.contractSize).to.equal(future.contractSize)
            expect(_future.product._id).to.be.undefined
            expect(_future.product.user).to.be.undefined
            expect(_future.product.__v).to.be.undefined

            const { trades } = _future

            expect(trades).to.be.an('array')
            expect(trades).to.have.lengthOf(1)

            expect(trades[0].type).to.equal(futureContract.trades[0].type)
            expect(trades[0].quantity).to.equal(futureContract.trades[0].quantity)
            expect(trades[0]._id).to.be.undefined

            expect(trades[0].price._id).to.be.undefined
            expect(trades[0].price.product).to.be.undefined
            expect(trades[0].price.__v).to.be.undefined
            expect(trades[0].price.date).to.be.an.instanceOf(Date)
            expect(trades[0].price.price).to.equal(price.price)

            expect(_option.product.productType).to.equal('option')
            expect(_option.product.ticker).to.equal(option.ticker)
            expect(_option.product.exchange).to.equal(option.exchange)
            expect(_option.product.sector).to.equal(option.sector)
            expect(_option.product.contractSize).to.equal(option.contractSize)
            expect(_option.product._id).to.be.undefined
            expect(_option.product.user).to.be.undefined
            expect(_option.product.__v).to.be.undefined

            const { trades: _trade } = _option

            expect(_trade).to.be.an('array')
            expect(_trade).to.have.lengthOf(1)

            expect(_trade[0].type).to.equal(optionContract.trades[0].type)
            expect(_trade[0].quantity).to.equal(optionContract.trades[0].quantity)
            expect(_trade[0]._id).to.be.undefined

            expect(_trade[0].price._id).to.be.undefined
            expect(_trade[0].price.product).to.be.undefined
            expect(_trade[0].price.__v).to.be.undefined
            expect(_trade[0].price.date).to.be.an.instanceOf(Date)
            expect(_trade[0].price.price).to.equal(optionPrice.price)
        })

        it('should fail when the user exist but no have contracts yet', async () => {
            await Contract.deleteMany()

            try {
                await retrieveUserTrades(userId)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal('user do not have trades yet')
            }
        })

        it('should return a type error', () => {
            userId = undefined
            expect(() => {
                retrieveUserTrades(userId)
            }).to.throw(TypeError, `${userId} is not a string`)

            userId = 123
            expect(() => {
                retrieveUserTrades(userId)
            }).to.throw(TypeError, `${userId} is not a string`)

            userId = true
            expect(() => {
                retrieveUserTrades(userId)
            }).to.throw(TypeError, `${userId} is not a string`)
        })

        it('should return an error', () => {
            userId = ''
            expect(() => {
                retrieveUserTrades(userId)
            }).to.throw(Error, 'string is empty or blank')

            userId = '    '
            expect(() => {
                retrieveUserTrades(userId)
            }).to.throw(Error, 'string is empty or blank')
        })
    })

    it('should fail when the user no exists', async () => {
        const _userId = ObjectId().toString()
        try {
            await retrieveUserTrades(_userId)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${_userId} does not exist`)
        }
    })

    afterEach(async () => {
        await User.deleteMany()
        await Contract.deleteMany()
        await Product.deleteMany()
        await Price.deleteMany()
    })

    after(mongoose.disconnect)
})

