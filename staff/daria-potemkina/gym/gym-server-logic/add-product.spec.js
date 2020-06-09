require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const addProduct = require('./add-product')
const { round, random } = Math
const { expect } = require('chai')
const { mongoose, models: { User, Future, Option } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')
const { ObjectId } = mongoose
const bcrypt = require('bcryptjs')

describe('logic - addProduct', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let name, surname, email, password, userId, future, option, card, futureId, optionId, sellBuy, quantity, _futureId, _optionId, _balance, _products, _sellBuy, _quantity, _productId

    beforeEach(async () => {
        await User.deleteMany()
        await Option.deleteMany()
        await Future.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        card = {
            number: `${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}`,
            holder: `name-${random()} surname-${random()}`,
            expirationDate: new Date('Janury 23, 2025'),
            cvv: `${round(random() * 1000)}`
        }

        future = {
            type: `type-${random()}`,
            exchange: `exchange-${random()}`,
            ticker: `ticker-${random()}`,
            sector: `sector-${random()}`,
            contractSize: round(random() * 100),
            expirationDate: new Date('September 18, 2020 17:45:00'),
            prices: [{
                date: new Date(),
                price: round(random() * 100)
            }]
        }

        option = {
            type: `type-${random()}`,
            exchange: `exchange-${random()}`,
            ticker: `ticker-${random()}`,
            sector: `sector-${random()}`,
            contractSize: round(random() * 100),
            side: `side-${random()}`,
            expirationDate: new Date('June 19, 2020 17:45:00'),
            strike: round(random() * 10),
            prices: [{
                date: new Date(),
                price: round(random() * 100)
            }]
        }

        quantity = round(random() * 10)

        hash = await bcrypt.hash(password, 10)
    })

    describe('when the user already exists', () => {
        beforeEach(async () => {
            const user = await User.create({ name, surname, email, password, card })
            userId = user._id.toString()

            const futures = await Future.create(future)
            futureId = futures._id.toString()
            const options = await Option.create(option)
            optionId = options._id.toString()

        })

        it('should add the purchase of future', async () => {
            sellBuy = 'buy'
            await addProduct(userId, futureId, sellBuy, quantity)

            const user = await User.find()

            const [{ products, balance }] = user

            expect(products).to.be.an('array')
            expect(products).to.have.lengthOf(1)

            const { prices } = future
            const [{ price }] = prices

            expect(balance.guarantee).to.equal(round(future.contractSize * quantity * 0.1 * price * 100) / 100)
            expect(balance.profitAndLoss).to.equal(0)

            const { product, quantitySold, quantityPurchased } = products[0]

            expect(product.toString()).to.equal(futureId)
            expect(quantitySold).to.equal(0)
            expect(quantityPurchased).to.equal(quantity)

        })

        it('should add the sale of future', async () => {
            sellBuy = 'sell'
            await addProduct(userId, futureId, sellBuy, quantity)

            const user = await User.find()

            const [{ products, balance }] = user

            expect(products).to.be.an('array')
            expect(products).to.have.lengthOf(1)

            const { prices } = future
            const [{ price }] = prices

            expect(balance.guarantee).to.equal(round(future.contractSize * quantity * 0.1 * price * 100) / 100)
            expect(balance.profitAndLoss).to.equal(0)

            const { product, quantitySold, quantityPurchased } = products[0]

            expect(product.toString()).to.equal(futureId)
            expect(quantitySold).to.equal(quantity)
            expect(quantityPurchased).to.equal(0)

        })

        it('should add the purchase of option', async () => {
            sellBuy = 'buy'
            await addProduct(userId, optionId, sellBuy, quantity)

            const user = await User.find()

            const [{ products, balance }] = user

            expect(products).to.be.an('array')
            expect(products).to.have.lengthOf(1)

            const { prices } = option
            const [{ price }] = prices

            expect(balance.guarantee).to.equal(round(option.contractSize * quantity * 0.1 * option.strike * 100) / 100)
            expect(balance.profitAndLoss).to.equal(option.contractSize * quantity * price * (-1))

            const { product, quantitySold, quantityPurchased } = products[0]

            expect(product.toString()).to.equal(optionId)
            expect(quantitySold).to.equal(0)
            expect(quantityPurchased).to.equal(quantity)

        })

        it('should add the purchase of option', async () => {
            sellBuy = 'sell'
            await addProduct(userId, optionId, sellBuy, quantity)

            const user = await User.find()

            const [{ products, balance }] = user

            expect(products).to.be.an('array')
            expect(products).to.have.lengthOf(1)

            const { prices } = option
            const [{ price }] = prices

            expect(balance.guarantee).to.equal(round(option.contractSize * quantity * 0.1 * option.strike * 100) / 100)
            expect(balance.profitAndLoss).to.equal(option.contractSize * quantity * price)

            const { product, quantitySold, quantityPurchased } = products[0]

            expect(product.toString()).to.equal(optionId)
            expect(quantitySold).to.equal(quantity)
            expect(quantityPurchased).to.equal(0)

        })

        it('should fail when user does not have the card added', async () => {
            await User.updateOne({ _id: userId }, { $unset: { card } })
            sellBuy = 'sell'

            try {
                await addProduct(userId, futureId, sellBuy, quantity)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal('user does not have a card added')
            }
        })

        it('should fail when the future does not exist', async () => {
            sellBuy = 'buy'
            _futureId = ObjectId().toString()

            try {
                await addProduct(userId, _futureId, sellBuy, quantity)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`product with id ${_futureId} is not exist`)
            }
        })

        it('should fail when the option does not exist', async () => {
            sellBuy = 'buy'
            _optionId = ObjectId().toString()

            try {
                await addProduct(userId, _optionId, sellBuy, quantity)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`product with id ${_optionId} is not exist`)
            }
        })

        it('should return an type error when synchronous error exists', () => {
            const productId = ObjectId().toString()
            _sellBuy = 'buy'

            _userId = undefined
            expect(() => {
                addProduct(_userId, productId, _sellBuy, quantity)
            }).to.throw(TypeError, `${_userId} is not a string`)

            _userId = 123
            expect(() => {
                addProduct(_userId, productId, _sellBuy, quantity)
            }).to.throw(TypeError, `${_userId} is not a string`)

            _userId = true
            expect(() => {
                addProduct(_userId, productId, _sellBuy, quantity)
            }).to.throw(TypeError, `${_userId} is not a string`)

            _productId = undefined
            expect(() => {
                addProduct(userId, _productId, _sellBuy, quantity)
            }).to.throw(TypeError, `${_productId} is not a string`)

            _productId = 123
            expect(() => {
                addProduct(userId, _productId, _sellBuy, quantity)
            }).to.throw(TypeError, `${_productId} is not a string`)

            _productId = true
            expect(() => {
                addProduct(userId, _productId, _sellBuy, quantity)
            }).to.throw(TypeError, `${_productId} is not a string`)

            _side = undefined
            expect(() => {
                addProduct(userId, productId, _side, quantity)
            }).to.throw(TypeError, `${_side} is not a string`)

            _side = 123
            expect(() => {
                addProduct(userId, productId, _side, quantity)
            }).to.throw(TypeError, `${_side} is not a string`)

            _side = true
            expect(() => {
                addProduct(userId, productId, _side, quantity)
            }).to.throw(TypeError, `${_side} is not a string`)

            _quantity = undefined
            expect(() => {
                addProduct(userId, productId, _sellBuy, _quantity)
            }).to.throw(TypeError, `${_quantity} is not a number`)

            _quantity = true
            expect(() => {
                addProduct(userId, productId, _sellBuy, _quantity)
            }).to.throw(TypeError, `${_quantity} is not a number`)

        })

        it('should return an error when synchronous error exists', () => {
            const productId = ObjectId().toString()
            _userId = ''
            expect(() => {
                addProduct(_userId, productId, sellBuy, quantity)
            }).to.throw(Error, 'string is empty or blank')

            _userId = '    '
            expect(() => {
                addProduct(_userId, productId, sellBuy, quantity)
            }).to.throw(Error, 'string is empty or blank')

            _productId = ''
            expect(() => {
                addProduct(userId, _productId, sellBuy, quantity)
            }).to.throw(Error, 'string is empty or blank')

            _productId = '    '
            expect(() => {
                addProduct(userId, _productId, sellBuy, quantity)
            }).to.throw(Error, 'string is empty or blank')

            _side = ''
            expect(() => {
                addProduct(userId, productId, _side, quantity)
            }).to.throw(Error, 'string is empty or blank')

            _side = '    '
            expect(() => {
                addProduct(userId, productId, _side, quantity)
            }).to.throw(Error, 'string is empty or blank')

            _quantity = 33.33
            expect(() => {
                addProduct(userId, productId, _sellBuy, _quantity)
            }).to.throw(Error, `${_quantity} is not an integer`)

        })
    })

    describe('when the user and at least one product already exists', () => {
        beforeEach(async () => {
            const futures = await Future.create(future)
            futureId = futures._id.toString()

            price = futures.prices[0].price

            const options = await Option.create(option)
            optionId = options._id.toString()

            _products = [{
                onModel: 'Future',
                product: futureId,
                quantitySold: 0,
                quantityPurchased: round(random() * 10)
            }]

            _balance = {
                guarantee: round(future.contractSize * quantity * 0.1 * price * 100) / 100,
                profitAndLoss: 0
            }

            const user = await User.create({ name, surname, email, password, card, products: _products, balance: _balance })
            userId = user._id.toString()
        })

        it('should add more amount of guarantee when more than product is added', async () => {
            sellBuy = 'sell'

            await addProduct(userId, optionId, sellBuy, quantity)

            const user = await User.find()

            const [{ products, balance }] = user

            expect(products).to.be.an('array')
            expect(products).to.have.lengthOf(2)

            const { prices } = option
            const [{ price }] = prices

            expect(balance.guarantee).to.equal(_balance.guarantee + round(option.contractSize * quantity * 0.1 * option.strike * 100) / 100)
            expect(balance.profitAndLoss).to.equal(option.contractSize * quantity * price)

            const { product, quantitySold, quantityPurchased } = products[0]
            const { product: _product, quantitySold: _quantitySold, quantityPurchased: _quantityPurchased } = products[1]

            expect(product.toString()).to.equal(futureId)
            expect(quantitySold).to.equal(0)
            expect(quantityPurchased).to.equal(_products[0].quantityPurchased)
            expect(_product.toString()).to.equal(optionId)
            expect(_quantitySold).to.equal(quantity)
            expect(_quantityPurchased).to.equal(0)
        })

        it('it should add the same product to the products', async () => {
            sellBuy = 'sell'

            await addProduct(userId, futureId, sellBuy, quantity)

            const user = await User.find()

            const [{ products, balance }] = user

            expect(products).to.be.an('array')
            expect(products).to.have.lengthOf(1)

            const { prices } = future
            const [{ price }] = prices

            expect(balance.guarantee).to.equal(_balance.guarantee + round(future.contractSize * quantity * 0.1 * price * 100) / 100)
            expect(balance.profitAndLoss).to.equal(0)

            const { product, quantitySold, quantityPurchased } = products[0]

            expect(product.toString()).to.equal(futureId)
            expect(quantitySold).to.equal(quantity)
            expect(quantityPurchased).to.equal(_products[0].quantityPurchased)
        })

    })

    afterEach(async () => {
        await User.deleteMany()
        await Future.deleteMany()
        await Option.deleteMany()
    })

    after(mongoose.disconnect)
})

