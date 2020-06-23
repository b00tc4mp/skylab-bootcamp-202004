require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const closeUserPosition = require('./close-user-position')
const { round, random } = Math
const { expect } = require('chai')
const { mongoose, models: { User, Product, Price, Contract, AccountBalance, Underlying } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')
const { ObjectId } = mongoose

describe('logic - closeUserPosition', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let optionUnderlying, user, userId, future, option, _option, futureId, optionId, _future, optionSellPutContract, optionBuyCallContract

    beforeEach(async () => {
        await User.deleteMany()
        await Product.deleteMany()
        await Contract.deleteMany()
        await AccountBalance.deleteMany()
        await Price.deleteMany()
        await Underlying.deleteMany()

        dateToday = new Date().toString().split(' ').slice(1, 4)

        dateToday.push('UTC')

        dateToday = dateToday.join(' ')

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
            settlementDate: new Date(dateToday)
        }

        _future = {
            productType: 'future',
            ticker: `ticker-${random()}`,
            exchange: `exchange-${random()}`,
            sector: `sector-${random()}`,
            contractSize: round(random() * 100),
            settlementDate: new Date('Jun 30 2020')
        }

        option = {
            productType: 'option',
            exchange: `exchange-${random()}`,
            ticker: `ticker-${random()}`,
            sector: `sector-${random()}`,
            contractSize: round(random() * 100),
            settlementDate: new Date(dateToday),
            type: {
                strike: 9,
                side: 'call',
            }
        }

        _option = {
            productType: 'option',
            exchange: `exchange-${random()}`,
            ticker: `ticker-${random()}`,
            sector: `sector-${random()}`,
            contractSize: round(random() * 100),
            settlementDate: new Date(dateToday),
            type: {
                strike: 11,
                side: 'put',
            }
        }

        guarantee = round(random() * 1000)
        profitAndLoss = round(random() * 1000)

    })

    describe('when user already exist', () => {
        beforeEach(async () => {
            const _user = await User.create(user)
            userId = _user._id.toString()

            const product = await Product.create(future)
            futureId = product._id.toString()

            const callOption = await Product.create(option)
            optionId = callOption._id.toString()

            const putOption = await Product.create(_option)
            _optionId = putOption._id.toString()

            const _futurePrice = await Price.create({ product: futureId, date: new Date('Jun 10 2020'), price: 10 })
            futurePrice = _futurePrice.price
            futurePriceId = _futurePrice._id.toString()

            const _optionPrice = await Price.create({ product: optionId, date: new Date('Jun 07 2020'), price: 10 })
            optionPrice = _optionPrice.price
            optionPriceId = _optionPrice._id.toString()

            const __optionPrice = await Price.create({ product: _optionId, date: new Date('Jun 08 2020'), price: 22 })
            ___optionPrice = __optionPrice.price
            _optionPriceId = __optionPrice._id.toString()

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

            optionSellCallContract = {
                user: userId,
                product: optionId,
                isValid: true,
                trades: [{
                    price: optionPriceId,
                    type: 'Sell',
                    quantity: round(random() * 10)
                }]
            }

            optionBuyCallContract = {
                user: userId,
                product: optionId,
                isValid: true,
                trades: [{
                    price: optionPriceId,
                    type: 'Buy',
                    quantity: round(random() * 10)
                }]
            }

            optionBuyPutContract = {
                user: userId,
                product: _optionId,
                isValid: true,
                trades: [{
                    price: _optionPriceId,
                    type: 'Buy',
                    quantity: round(random() * 10)
                }]
            }

            optionSellPutContract = {
                user: userId,
                product: _optionId,
                isValid: true,
                trades: [{
                    price: _optionPriceId,
                    type: 'Sell',
                    quantity: round(random() * 10)
                }]
            }

            await AccountBalance.create({ user: userId, date: new Date('Jun 10 2020'), guarantee, profitAndLoss })

            const __futurePrice = await Price.create({ product: futureId, date: new Date(dateToday), price: 8 })
            ___futurePrice = __futurePrice.price

            optionUnderlying = await Underlying.create({ ticker: option.ticker })

            const optionCallPrice = await Price.create({ product: optionUnderlying._id, date: new Date(dateToday), price: 14 })
            ___optionPrice = optionCallPrice.price

            _optionUnderlying = await Underlying.create({ ticker: _option.ticker })

            const optionPutPrice = await Price.create({ product: _optionUnderlying._id, date: new Date(dateToday), price: 10 })
            ____optionPrice = optionPutPrice.price
        })

        it('should modify the user profits and losses and delete the trades setteled in long futures', async () => {
            contract = await Contract.create(futureBuyContract)

            await closeUserPosition(userId)

            const balance = await AccountBalance.find({ user: ObjectId(userId) }).sort({ date: -1 })

            expect(balance).to.be.an('array')
            expect(balance).to.have.lengthOf(2)

            const [_balance] = balance

            expect(_balance).to.be.an.instanceOf(Object)
            expect(_balance.user.toString()).to.equal(userId)
            expect(_balance.date).to.be.an.instanceOf(Date)
            expect(_balance.guarantee).to.equal(0)
            expect(_balance.profitAndLoss).to.equal(round((profitAndLoss + (___futurePrice - futurePrice) * future.contractSize * futureBuyContract.trades[0].quantity) * 100) / 100)

            const _contract = await Contract.find({ user: ObjectId(userId) })

            expect(_contract).to.have.lengthOf(1)
            expect(_contract[0].isValid).to.equal(false)
        })

        it('should modify the user profits and losses in nd delete the trades setteled in short futures', async () => {
            contract = await Contract.create(futureSellContract)

            await closeUserPosition(userId)

            const balance = await AccountBalance.find({ user: ObjectId(userId) }).sort({ date: -1 })

            expect(balance).to.be.an('array')
            expect(balance).to.have.lengthOf(2)

            const [_balance] = balance

            expect(_balance).to.be.an.instanceOf(Object)
            expect(_balance.user.toString()).to.equal(userId)
            expect(_balance.date).to.be.an.instanceOf(Date)
            expect(_balance.guarantee).to.equal(0)
            expect(_balance.profitAndLoss).to.equal(round((profitAndLoss + (futurePrice - ___futurePrice) * future.contractSize * futureSellContract.trades[0].quantity) * 100) / 100)

            const _contract = await Contract.find({ user: ObjectId(userId) })

            expect(_contract).to.have.lengthOf(1)
            expect(_contract[0].isValid).to.equal(false)

        })

        it('should modify the user profits and losses and delete the trades setteled in short options position', async () => {
            contract = await Contract.create(optionSellCallContract)

            await closeUserPosition(userId)

            const balance = await AccountBalance.find({ user: ObjectId(userId) }).sort({ date: -1 })

            expect(balance).to.be.an('array')
            expect(balance).to.have.lengthOf(2)

            const [_balance] = balance

            expect(_balance).to.be.an.instanceOf(Object)
            expect(_balance.user.toString()).to.equal(userId)
            expect(_balance.date).to.be.an.instanceOf(Date)
            expect(_balance.guarantee).to.equal(0)
            expect(_balance.profitAndLoss).to.equal(round((profitAndLoss - (___optionPrice - option.type.strike) * option.contractSize * optionSellCallContract.trades[0].quantity) * 100) / 100)

            const _contract = await Contract.find({ user: ObjectId(userId) })

            expect(_contract).to.have.lengthOf(1)
            expect(_contract[0].isValid).to.equal(false)
        })

        it('should modify the user profits and losses and delete the trades setteled in short options position', async () => {
            contract = await Contract.create(optionBuyCallContract)

            await closeUserPosition(userId)

            const balance = await AccountBalance.find({ user: ObjectId(userId) }).sort({ date: -1 })

            expect(balance).to.be.an('array')
            expect(balance).to.have.lengthOf(2)

            const [_balance] = balance

            expect(_balance).to.be.an.instanceOf(Object)
            expect(_balance.user.toString()).to.equal(userId)
            expect(_balance.date).to.be.an.instanceOf(Date)
            expect(_balance.guarantee).to.equal(0)
            expect(_balance.profitAndLoss).to.equal(round((profitAndLoss + (___optionPrice - option.type.strike) * option.contractSize * optionBuyCallContract.trades[0].quantity) * 100) / 100)

            const _contract = await Contract.find({ user: ObjectId(userId) })

            expect(_contract).to.have.lengthOf(1)
            expect(_contract[0].isValid).to.equal(false)
        })

        it('should modify the user profits and losses and delete the trades setteled in short options position', async () => {
            contract = await Contract.create(optionBuyPutContract)

            await closeUserPosition(userId)

            const balance = await AccountBalance.find({ user: ObjectId(userId) }).sort({ date: -1 })

            expect(balance).to.be.an('array')
            expect(balance).to.have.lengthOf(2)

            const [_balance] = balance

            expect(_balance).to.be.an.instanceOf(Object)
            expect(_balance.user.toString()).to.equal(userId)
            expect(_balance.date).to.be.an.instanceOf(Date)
            expect(_balance.guarantee).to.equal(0)
            expect(_balance.profitAndLoss).to.equal(round((profitAndLoss + (_option.type.strike - ____optionPrice) * _option.contractSize * optionBuyPutContract.trades[0].quantity) * 100) / 100)

            const _contract = await Contract.find({ user: ObjectId(userId) })

            expect(_contract).to.have.lengthOf(1)
            expect(_contract[0].isValid).to.equal(false)
        })

        it('should modify the user profits and losses and delete the trades setteled in short options position', async () => {
            contract = await Contract.create(optionSellPutContract)

            await closeUserPosition(userId)

            const balance = await AccountBalance.find({ user: ObjectId(userId) }).sort({ date: -1 })

            expect(balance).to.be.an('array')
            expect(balance).to.have.lengthOf(2)

            const [_balance] = balance

            expect(_balance).to.be.an.instanceOf(Object)
            expect(_balance.user.toString()).to.equal(userId)
            expect(_balance.date).to.be.an.instanceOf(Date)
            expect(_balance.guarantee).to.equal(0)
            expect(_balance.profitAndLoss).to.equal(round((profitAndLoss - (_option.type.strike - ____optionPrice) * _option.contractSize * optionSellPutContract.trades[0].quantity) * 100) / 100)

            const _contract = await Contract.find({ user: ObjectId(userId) })

            expect(_contract).to.have.lengthOf(1)
            expect(_contract[0].isValid).to.equal(false)
        })

        it('should return a type error', () => {
            userId = undefined
            expect(() => {
                closeUserPosition(userId)
            }).to.throw(TypeError, `${userId} is not a string`)

            userId = 123
            expect(() => {
                closeUserPosition(userId)
            }).to.throw(TypeError, `${userId} is not a string`)

            userId = true
            expect(() => {
                closeUserPosition(userId)
            }).to.throw(TypeError, `${userId} is not a string`)
        })

        it('should return an error', () => {
            userId = ''
            expect(() => {
                closeUserPosition(userId)
            }).to.throw(Error, 'string is empty or blank')

            userId = '    '
            expect(() => {
                closeUserPosition(userId)
            }).to.throw(Error, 'string is empty or blank')
        })

    })


    it('should fail when the user exist but have no contract yet ', async () => {
        const _user = await User.create(user)
        userId = _user._id.toString()

        try {
            await closeUserPosition(userId)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceOf(UnexistenceError)
            expect(error.message).to.equal('user have no current contracts')
        }

    })

    it('should fail when the user no exists', async () => {
        const _userId = ObjectId().toString()
        try {
            await closeUserPosition(_userId)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceOf(UnexistenceError)
            expect(error.message).to.equal(`user with id ${_userId} is not exist`)
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
                await closeUserPosition(userId)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`there are no account balance created for user with id ${userId}`)
            }
        })
    })

    describe('when the settlement date is not equal today', () => {
        beforeEach(async () => {
            const _user = await User.create(user)
            userId = _user._id.toString()

            const product = await Product.create(_future)
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
            await AccountBalance.create({ user: userId, date: new Date('Jun 10 2020'), guarantee, profitAndLoss })

        })
    })

    afterEach(async () => {
        await User.deleteMany()
        await Product.deleteMany()
        await Contract.deleteMany()
        await AccountBalance.deleteMany()
        await Price.deleteMany()
        await Underlying.deleteMany()
    })

    after(mongoose.disconnect)

})