require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const addProduct = require('./add-product')
const { round, random } = Math
const { expect } = require('chai')
const { mongoose, models: { User, Product, Price, Contract, AccountBalance } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')
const { ObjectId } = mongoose
const bcrypt = require('bcryptjs')

describe('logic - addProduct', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let name, surname, email, password, userId, future, option, card, futureId, optionId, sellBuy, quantity, _futureId, _optionId, _sellBuy, _quantity, _productId, price, priceId, optionPriceId, optionPrice, _trade, dateToday, guarantee

    beforeEach(async () => {
        await User.deleteMany()
        await Product.deleteMany()
        await Contract.deleteMany()
        await AccountBalance.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        card = {
            number: `${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}`,
            holder: `name-${random()} surname-${random()}`,
            expirationDate: 'Janury 23, 2025',
            cvv: `${round(random() * 1000)}`
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
            settlementDate: 'Jun 19 2020',
            type: {
                strike: round(random() * 10),
                side: `side-${random()}`
            }
        }

        quantity = round(random() * 10)

        hash = await bcrypt.hash(password, 10)

        dateToday = new Date()
    })

    describe('when the user already exists', () => {
        beforeEach(async () => {
            const user = await User.create({ name, surname, email, password, card })
            userId = user._id.toString()

            const product = await Product.create(future)
            futureId = product._id.toString()

            const _option = await Product.create(option)
            optionId = _option._id.toString()

            price = await Price.create({ product: futureId, date: dateToday, price: random().toFixed(2) * 1 })
            priceId = price._id.toString()

            optionPrice = await Price.create({ product: optionId, date: dateToday, price: random().toFixed(2) * 1 })
            optionPriceId = optionPrice._id.toString()
        })

        it('should add the purchase of future', async () => {
            sellBuy = 'Buy'
            
            await addProduct(userId, futureId, priceId, sellBuy, quantity)

            const accountBalance = await AccountBalance.find()

            const [balance] = accountBalance

            expect(balance.profitAndLoss).to.equal(0)
            expect(balance.guarantee).to.equal((future.contractSize * quantity * 0.1).toFixed(2) * 1)

            const contract = await Contract.find()

            const { user: _user, product, trades } = contract[0]

            expect(product.toString()).to.equal(futureId)
            expect(_user.toString()).to.equal(userId)

            expect(trades).to.be.an('array')
            expect(trades).to.have.lengthOf(1)

            const [trade] = trades

            expect(trade.price.toString()).to.equal(priceId)
            expect(trade.type).to.equal(sellBuy)
            expect(trade.quantity).to.equal(quantity)
        })

        it('should add the sale of future', async () => {
            sellBuy = 'Sell'
            await addProduct(userId, futureId, priceId, sellBuy, quantity)

            const accountBalance = await AccountBalance.find()

            const [balance] = accountBalance

            expect(balance.profitAndLoss).to.equal(0)
            expect(balance.guarantee).to.equal((future.contractSize * quantity * 0.1).toFixed(2) * 1)

            const contract = await Contract.find()

            const { user: _user, product, trades } = contract[0]

            expect(product.toString()).to.equal(futureId)
            expect(_user.toString()).to.equal(userId)

            expect(trades).to.be.an('array')
            expect(trades).to.have.lengthOf(1)

            const [trade] = trades

            expect(trade.price.toString()).to.equal(priceId)
            expect(trade.type).to.equal(sellBuy)
            expect(trade.quantity).to.equal(quantity)

        })

        it('should add the purchase of option', async () => {
            sellBuy = 'Buy'
            await addProduct(userId, optionId, optionPriceId, sellBuy, quantity)

            const accountBalance = await AccountBalance.find()

            const [balance] = accountBalance

            expect(balance.user.toString()).to.equal(userId)
            expect(balance.date).to.be.an.instanceOf(Date)
            expect(balance.guarantee).to.equal((option.contractSize * quantity * 0.1).toFixed(2) * 1)
            expect(balance.profitAndLoss).to.equal((option.contractSize * quantity * optionPrice.price * (-1)).toFixed(2) * 1)

            const contract = await Contract.find()

            const { user: _user, product, trades } = contract[0]

            expect(product.toString()).to.equal(optionId)
            expect(_user.toString()).to.equal(userId)

            expect(trades).to.be.an('array')
            expect(trades).to.have.lengthOf(1)

            const [trade] = trades

            expect(trade.price.toString()).to.equal(optionPriceId)
            expect(trade.type).to.equal(sellBuy)
            expect(trade.quantity).to.equal(quantity)

        })

        it('should add the purchase of option', async () => {
            sellBuy = 'Sell'
            await addProduct(userId, optionId, optionPriceId, sellBuy, quantity)

            const accountBalance = await AccountBalance.find()

            const [balance] = accountBalance

            expect(balance.user.toString()).to.equal(userId)
            expect(balance.date).to.be.an.instanceOf(Date)
            expect(balance.guarantee).to.equal((option.contractSize * quantity * 0.1).toFixed(2) * 1)
            expect(balance.profitAndLoss).to.equal((option.contractSize * quantity * optionPrice.price).toFixed(2) * 1)

            const contract = await Contract.find()

            const { user: _user, product, trades } = contract[0]

            expect(product.toString()).to.equal(optionId)
            expect(_user.toString()).to.equal(userId)

            expect(trades).to.be.an('array')
            expect(trades).to.have.lengthOf(1)

            const [trade] = trades

            expect(trade.price.toString()).to.equal(optionPriceId)
            expect(trade.type).to.equal(sellBuy)
            expect(trade.quantity).to.equal(quantity)
        })

        it('should fail when user does not have the card added', async () => {
            await User.updateOne({ _id: userId }, { $unset: { card } })
            sellBuy = 'Sell'

            try {
                await addProduct(userId, futureId, priceId, sellBuy, quantity)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal('user does not have a card added')
            }
        })

        it('should fail when the future does not exist', async () => {
            sellBuy = 'Buy'
            _futureId = ObjectId().toString()

            try {
                await addProduct(userId, _futureId, priceId, sellBuy, quantity)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`product with id ${_futureId} is not exist`)
            }
        })

        it('should fail when the option does not exist', async () => {
            sellBuy = 'Buy'
            _optionId = ObjectId().toString()

            try {
                await addProduct(userId, _optionId, priceId, sellBuy, quantity)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`product with id ${_optionId} is not exist`)
            }
        })

        it('should return an type error when synchronous error exists', () => {
            const productId = ObjectId().toString()
            _sellBuy = 'Buy'

            _userId = undefined
            expect(() => {
                addProduct(_userId, productId, priceId, _sellBuy, quantity)
            }).to.throw(TypeError, `${_userId} is not a string`)

            _userId = 123
            expect(() => {
                addProduct(_userId, productId, priceId, _sellBuy, quantity)
            }).to.throw(TypeError, `${_userId} is not a string`)

            _userId = true
            expect(() => {
                addProduct(_userId, productId, priceId, _sellBuy, quantity)
            }).to.throw(TypeError, `${_userId} is not a string`)

            _productId = undefined
            expect(() => {
                addProduct(userId, _productId, priceId, _sellBuy, quantity)
            }).to.throw(TypeError, `${_productId} is not a string`)

            _productId = 123
            expect(() => {
                addProduct(userId, _productId, priceId, _sellBuy, quantity)
            }).to.throw(TypeError, `${_productId} is not a string`)

            _productId = true
            expect(() => {
                addProduct(userId, _productId, priceId, _sellBuy, quantity)
            }).to.throw(TypeError, `${_productId} is not a string`)

            _side = undefined
            expect(() => {
                addProduct(userId, productId, priceId, _side, quantity)
            }).to.throw(TypeError, `${_side} is not a string`)

            _side = 123
            expect(() => {
                addProduct(userId, productId, priceId, _side, quantity)
            }).to.throw(TypeError, `${_side} is not a string`)

            _side = true
            expect(() => {
                addProduct(userId, productId, priceId, _side, quantity)
            }).to.throw(TypeError, `${_side} is not a string`)

            _quantity = undefined
            expect(() => {
                addProduct(userId, productId, priceId, _sellBuy, _quantity)
            }).to.throw(TypeError, `${_quantity} is not a number`)

            _quantity = true
            expect(() => {
                addProduct(userId, productId, priceId, _sellBuy, _quantity)
            }).to.throw(TypeError, `${_quantity} is not a number`)

        })

        it('should return an error when synchronous error exists', () => {
            const productId = ObjectId().toString()
            _userId = ''
            expect(() => {
                addProduct(_userId, productId, priceId, sellBuy, quantity)
            }).to.throw(Error, 'string is empty or blank')

            _userId = '    '
            expect(() => {
                addProduct(_userId, productId, priceId, sellBuy, quantity)
            }).to.throw(Error, 'string is empty or blank')

            _productId = ''
            expect(() => {
                addProduct(userId, _productId, priceId, sellBuy, quantity)
            }).to.throw(Error, 'string is empty or blank')

            _productId = '    '
            expect(() => {
                addProduct(userId, _productId, priceId, sellBuy, quantity)
            }).to.throw(Error, 'string is empty or blank')

            _side = ''
            expect(() => {
                addProduct(userId, productId, priceId, _side, quantity)
            }).to.throw(Error, 'string is empty or blank')

            _side = '    '
            expect(() => {
                addProduct(userId, productId, priceId, _side, quantity)
            }).to.throw(Error, 'string is empty or blank')

            _quantity = 33.33
            expect(() => {
                addProduct(userId, productId, priceId, _sellBuy, _quantity)
            }).to.throw(Error, `${_quantity} is not an integer`)

        })
    })

    describe('when the user and at least one product already exists', () => {
        beforeEach(async () => {
            const futures = await Product.create(future)
            futureId = futures._id.toString()

            const options = await Product.create(option)
            optionId = options._id.toString()

            price = await Price.create({ product: futureId, date: dateToday, price: random().toFixed(2) * 1 })
            priceId = price._id.toString()

            optionPrice = await Price.create({ product: futureId, date: dateToday, price: random().toFixed(2) * 1 })
            optionPriceId = optionPrice._id.toString()

            const user = await User.create({ name, surname, email, password, card })
            userId = user._id.toString()

            _contract = {
                user: userId,
                product: futureId,
                isValid: true
            }

            _trade = {
                price: priceId,
                type: 'Buy',
                quantity: 3
            }

            const contract = await Contract.create(_contract)

            contract.trades.push(_trade)

            await contract.save()

            // guarantee = await AccountBalance.create({user: ObjectId(userId), date: new Date(), guarantee: round(random() * 100), profitAndLoss: round(random()*100)})
        })

        it('should add more amount of guarantee when more than product is added', async () => {
            sellBuy = 'Sell'

            await addProduct(userId, optionId, optionPriceId, sellBuy, quantity)

            const accountBalance = await AccountBalance.find()

            expect(accountBalance).to.be.an('array')
            expect(accountBalance).to.have.lengthOf(1)

            const [balance] = accountBalance

            expect(balance.user.toString()).to.equal(userId)
            expect(balance.date).to.be.an.instanceOf(Date)
            expect(balance.guarantee).to.equal(((future.contractSize * _trade.quantity + quantity * option.contractSize) * 0.1).toFixed(2) * 1)
            expect(balance.profitAndLoss).to.equal((option.contractSize * quantity * optionPrice.price).toFixed(2) * 1)

            const contract = await Contract.find()

            expect(contract).to.be.an('array')
            expect(contract).to.have.lengthOf(2)

            const { user: _user, product, trades } = contract[1]

            expect(product.toString()).to.equal(optionId)
            expect(_user.toString()).to.equal(userId)

            expect(trades).to.be.an('array')
            expect(trades).to.have.lengthOf(1)

            const [trade] = trades

            expect(trade.price.toString()).to.equal(optionPriceId)
            expect(trade.type).to.equal(sellBuy)
            expect(trade.quantity).to.equal(quantity)
        })

        it('it should add the same product to the products', async () => {
            sellBuy = 'Buy'
            quantity = 4

            await addProduct(userId, futureId, priceId, sellBuy, quantity)

            const accountBalance = await AccountBalance.find()

            expect(accountBalance).to.be.an('array')
            expect(accountBalance).to.have.lengthOf(1)

            const [balance] = accountBalance

            expect(balance.guarantee).to.equal((future.contractSize * (_trade.quantity + quantity) * 0.1).toFixed(2) * 1)
            expect(balance.profitAndLoss).to.equal(0)

            const contract = await Contract.find()

            expect(contract).to.be.an('array')
            expect(contract).to.have.lengthOf(1)

            const { user: _user, product, trades } = contract[0]

            expect(product.toString()).to.equal(futureId)
            expect(_user.toString()).to.equal(userId)

            expect(trades).to.be.an('array')
            expect(trades).to.have.lengthOf(1)

            const [trade] = trades

            expect(trade.price.toString()).to.equal(priceId)
            expect(trade.type).to.equal('Buy')
            expect(trade.quantity).to.equal(quantity + _trade.quantity)
        })

        it('it should add the same product to the products with change the side', async () => {
            sellBuy = 'Sell'
            quantity = 4

            await addProduct(userId, futureId, priceId, sellBuy, quantity)

            const accountBalance = await AccountBalance.find()

            expect(accountBalance).to.be.an('array')
            expect(accountBalance).to.have.lengthOf(1)

            const [balance] = accountBalance

            expect(balance.guarantee).to.equal((future.contractSize * (_trade.quantity * (-1) + quantity) * 0.1).toFixed(2) * 1)
            expect(balance.profitAndLoss).to.equal(0)

            const contract = await Contract.find()

            expect(contract).to.be.an('array')
            expect(contract).to.have.lengthOf(1)

            const { user: _user, product, trades } = contract[0]

            expect(product.toString()).to.equal(futureId)
            expect(_user.toString()).to.equal(userId)

            expect(trades).to.be.an('array')
            expect(trades).to.have.lengthOf(1)

            const [trade] = trades

            expect(trade.price.toString()).to.equal(priceId)
            expect(trade.type).to.equal('Sell')
            expect(trade.quantity).to.equal(1)
        })

        it('it should add the same product to the products without change the side', async () => {
            sellBuy = 'Sell'
            quantity = 2

            await addProduct(userId, futureId, priceId, sellBuy, quantity)

            const accountBalance = await AccountBalance.find()

            expect(accountBalance).to.be.an('array')
            expect(accountBalance).to.have.lengthOf(1)

            const [balance] = accountBalance

            expect(balance.guarantee).to.equal((future.contractSize * (_trade.quantity  - quantity) * 0.1).toFixed(2) * 1)
            expect(balance.profitAndLoss).to.equal(0)

            const contract = await Contract.find()

            expect(contract).to.be.an('array')
            expect(contract).to.have.lengthOf(1)

            const { user: _user, product, trades } = contract[0]

            expect(product.toString()).to.equal(futureId)
            expect(_user.toString()).to.equal(userId)

            expect(trades).to.be.an('array')
            expect(trades).to.have.lengthOf(1)

            const [trade] = trades

            expect(trade.price.toString()).to.equal(priceId)
            expect(trade.type).to.equal('Buy')
            expect(trade.quantity).to.equal(1)
        })

        it('it should add the same product to the products with closed position', async () => {
            sellBuy = 'Sell'
            quantity = 3

            await addProduct(userId, futureId, priceId, sellBuy, quantity)

            const accountBalance = await AccountBalance.find()

            expect(accountBalance).to.be.an('array')
            expect(accountBalance).to.have.lengthOf(1)

            const [balance] = accountBalance

            expect(balance.guarantee).to.equal(0)
            expect(balance.profitAndLoss).to.equal(0)

            const contract = await Contract.find()

            expect(contract).to.be.an('array')
            expect(contract).to.have.lengthOf(1)
            expect(contract[0].isValid).to.equal(false)
        })
    })

    afterEach(async () => {
        await User.deleteMany()
        await Product.deleteMany()
        await Contract.deleteMany()
        await AccountBalance.deleteMany()
    })

    after(mongoose.disconnect)
})

