require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const profitAndLoss = require('./profit-and-loss')
const { round, random } = Math
const { expect } = require('chai')
const { mongoose, models: { User, Product, Price, Contract, AccountBalance } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')
const { ObjectId } = mongoose

describe('logic - ProfitAndLoss', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let user, userId, future, option, futureId, optionId, futurePrice, futureBuyContract, ___futurePrice, futurePriceId, optionPriceId, dateToday, _profitAndLoss

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
            settlementDate: new Date('Jun 30 2020'),
        }

        option = {
            productType: 'option',
            exchange: `exchange-${random()}`,
            ticker: `ticker-${random()}`,
            sector: `sector-${random()}`,
            contractSize: round(random() * 100),
            settlementDate: new Date('Jun 30 2020'),
            type: {
                strike: 9,
                side: 'call',
            }
        }

        dateToday = new Date()

        guarantee = round(random() * 1000)

        _profitAndLoss = round(random() * 1000)

    })

    describe('when user already exists', () => {
        beforeEach(async () => {
            const _user = await User.create(user)
            userId = _user._id.toString()

            const product = await Product.create(future)
            futureId = product._id.toString()

            const _option = await Product.create(option)
            optionId = _option._id.toString()

            const _futurePrice = await Price.create({ product: futureId, date: new Date('Jun 07 2020'), price: 10 })
            futurePrice = _futurePrice.price
            futurePriceId = _futurePrice._id.toString()

            const _optionPrice = await Price.create({ product: optionId, date: new Date('Jun 07 2020'), price: 10 })
            optionPrice = _optionPrice.price
            optionPriceId = _optionPrice._id.toString()

            futureBuyContract = {
                user: userId,
                product: futureId,
                isValid: true,
                trades: [{
                    price: futurePriceId,
                    type: 'Buy',
                    quantity: round(random() * 10)
                }]
            }

            futureSellContract = {
                user: userId,
                product: futureId,
                isValid: true,
                trades: [{
                    price: futurePriceId,
                    type: 'Sell',
                    quantity: round(random() * 10)
                }]
            }

            optionsBuyContract = {
                user: userId,
                product: optionId,
                isValid: true,
                trades: [{
                    price: optionPriceId,
                    type: 'Buy',
                    quantity: round(random() * 10)
                }]
            }

            await AccountBalance.create({ user: userId, date: new Date('Jun 10 2020'), guarantee, profitAndLoss: _profitAndLoss })

            const __futurePrice = await Price.create({ product: futureId, date: dateToday, price: 8 })
            ___futurePrice = __futurePrice.price

            const __optionPrice = await Price.create({ product: optionId, date: dateToday, price: 8 })
            ___optionPrice = __optionPrice.price

        })

        it('should calculate profits and losses for user long position', async () => {
            await Contract.create(futureBuyContract)

            await profitAndLoss(userId)

            const balance = await AccountBalance.find({ user: ObjectId(userId) }).sort({ date: -1 })

            expect(balance).to.be.an('array')
            expect(balance).to.have.lengthOf(2)

            const [_balance] = balance

            expect(_balance).to.be.an.instanceOf(Object)
            expect(_balance.user.toString()).to.equal(userId)
            expect(_balance.date).to.be.an.instanceOf(Date)
            expect(_balance.guarantee).to.equal((future.contractSize * futureBuyContract.trades[0].quantity * 0.1).toFixed(2) * 1)
            expect(_balance.profitAndLoss).to.equal(round((_profitAndLoss + (futurePrice - ___futurePrice) * future.contractSize * futureBuyContract.trades[0].quantity)))
        })

        it('should calculate profits and losses for user short position', async () => {
            await Contract.create(futureSellContract)

            await profitAndLoss(userId)

            const balance = await AccountBalance.find({ user: ObjectId(userId) }).sort({ date: -1 })

            expect(balance).to.be.an('array')
            expect(balance).to.have.lengthOf(2)

            const [_balance] = balance

            expect(_balance).to.be.an.instanceOf(Object)
            expect(_balance.user.toString()).to.equal(userId)
            expect(_balance.date).to.be.an.instanceOf(Date)
            expect(_balance.guarantee).to.equal((future.contractSize * futureSellContract.trades[0].quantity * 0.1).toFixed(2) * 1)
            expect(_balance.profitAndLoss).to.equal(round(_profitAndLoss - (futurePrice - ___futurePrice) * future.contractSize * futureSellContract.trades[0].quantity))
        })

        it('should no calculate profit and loss for options positions', async () => {
            await Contract.create(optionsBuyContract)

            await profitAndLoss(userId)

            const balance = await AccountBalance.find({ user: ObjectId(userId) }).sort({ date: -1 })

            expect(balance).to.be.an('array')
            expect(balance).to.have.lengthOf(1)

            const [_balance] = balance

            expect(_balance).to.be.an.instanceOf(Object)
            expect(_balance.user.toString()).to.equal(userId)
            expect(_balance.date).to.be.an.instanceOf(Date)
            expect(_balance.guarantee).to.equal(guarantee)
            expect(_balance.profitAndLoss).to.equal(_profitAndLoss)
        })

        it('should update profits and lossed with more than one product', async () => {
            await Contract.create(futureBuyContract)
            await Contract.create(futureSellContract)

            await profitAndLoss(userId)

            const balance = await AccountBalance.find({ user: ObjectId(userId) }).sort({ date: -1 })

            expect(balance).to.be.an('array')
            expect(balance).to.have.lengthOf(2)

            const [_balance] = balance

            expect(_balance).to.be.an.instanceOf(Object)
            expect(_balance.user.toString()).to.equal(userId)
            expect(_balance.date).to.be.an.instanceOf(Date)
            expect(_balance.guarantee).to.equal((future.contractSize * (futureSellContract.trades[0].quantity+futureBuyContract.trades[0].quantity) * 0.1).toFixed(2) * 1)

            const __profitAndLoss = ((futurePrice - ___futurePrice) * future.contractSize * (futureBuyContract.trades[0].quantity - futureSellContract.trades[0].quantity))
            expect(_balance.profitAndLoss).to.equal(round(_profitAndLoss + __profitAndLoss))
        })

        it('should return a type error', () => {
            userId = undefined
            expect(() => {
                profitAndLoss(userId)
            }).to.throw(TypeError, `${userId} is not a string`)

            userId = 123
            expect(() => {
                profitAndLoss(userId)
            }).to.throw(TypeError, `${userId} is not a string`)

            userId = true
            expect(() => {
                profitAndLoss(userId)
            }).to.throw(TypeError, `${userId} is not a string`)
        })

        it('should return an error', () => {
            userId = ''
            expect(() => {
                profitAndLoss(userId)
            }).to.throw(Error, 'string is empty or blank')

            userId = '    '
            expect(() => {
                profitAndLoss(userId)
            }).to.throw(Error, 'string is empty or blank')
        })

    })

    it('should fail when the user exist but have no contract yet ', async () => {
        const _user = await User.create(user)
        userId = _user._id.toString()

        try {
            await profitAndLoss(userId)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceOf(UnexistenceError)
            expect(error.message).to.equal(`user with id ${userId} have no current contracts`)
        }

    })

    describe('when user is exist but no balance created', () => {
        beforeEach(async () => {
            const _user = await User.create(user)
            userId = _user._id.toString()

            const product = await Product.create(future)
            futureId = product._id.toString()

            const _futurePrice = await Price.create({ product: futureId, date: new Date('Jun 07 2020'), price: 10 })
            futurePrice = _futurePrice.price
            futurePriceId = _futurePrice._id.toString()

            futureBuyContract = {
                user: userId,
                product: futureId,
                isValid: true,
                trades: [{
                    price: futurePriceId,
                    type: 'Buy',
                    quantity: round(random() * 10)
                }]
            }

            await Contract.create(futureBuyContract)

        })
        it('should fail when the user exist but have balance created (no products added yet)', async () => {
            try {
                await profitAndLoss(userId)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`there are no account balance created for user with id ${userId}`)
            }
        })


    })


    it('should fail when the user no exists', async () => {
        const _userId = ObjectId().toString()
        try {
            await profitAndLoss(_userId)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceOf(UnexistenceError)
            expect(error.message).to.equal(`user with id ${_userId} is not exist`)
        }
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