require('dotenv').config()

const { env: { MONGODB_URL_TEST, SECRET_TEST: SECRET } } = process

const retrieveUserPortfolio = require('./retrieve-user-portfolio')
const { random, round } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
require('gym-commons/ponyfills/xhr')
const { ObjectId } = mongo
const { utils: { jwtPromised } } = require('gym-commons')
const moment = require('moment')
const context = require('./context')

context.storage = {}

describe('logic - retrieveUserPortfolio', () => {
    let users, products, prices, contracts

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => {
            users = connection.db().collection('users')
            products = connection.db().collection('products')
            contracts = connection.db().collection('contracts')
            prices = connection.db().collection('prices')
        }))

    let user, product, price, userId, productId, priceId

    beforeEach(() => {
        return Promise.all([
            users.deleteMany(),
            products.deleteMany(),
            contracts.deleteMany(),
            prices.deleteMany()
        ])
            .then(() => {
                product = {
                    productType: 'future',
                    ticker: `ticker-${random()}`,
                    exchange: `exchange-${random()}`,
                    sector: `sector-${random()}`,
                    contractSize: round(random() * 100),
                    settlementDate: new Date('June 18 2020')
                }

                side = ['Buy', 'Sell']

                user = {
                    name: `name-${random()}`,
                    surname: `surname-${random()}`,
                    email: `email-${random()}`,
                    password: `password-${random()}`,
                    card: {
                        number: `${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}`,
                        holder: `name-${random()} surname-${random()}`,
                        expirationDate: new Date('Janury 23, 2025'),
                        cvv: `${round(random() * 1000)}`
                    }
                }

                return products.insertOne(product).then(_product => productId = _product.insertedId.toString())
                    .then(() => {
                        price = {
                            product: ObjectId(productId),
                            date: new Date('June 10 2020'),
                            price: random().toFixed(2) * 1
                        }
                        return prices.insertOne(price).then(_price => priceId = _price.insertedId.toString())
                            .then(() => users.insertOne(user)
                                .then(_user => {
                                    userId = _user.insertedId.toString()
                                    return jwtPromised.sign({ sub: _user.insertedId.toString() }, SECRET)
                                        .then(_token => context.storage.token = _token)
                                        .then(() => {
                                            contract = {
                                                user: ObjectId(userId),
                                                product: ObjectId(productId),
                                                isValid: true,
                                                trades: [{
                                                    price: ObjectId(priceId),
                                                    type: side[round(random())],
                                                    quantity: round(random() * 10)
                                                }]
                                            }
                                            return contracts.insertOne(contract)
                                        })
                                }))
                    })
            })
    })

    it('should return a users trades', () => {
        return retrieveUserPortfolio()
            .then(results => {
                expect(results).to.be.an('array')
                expect(results).have.lengthOf(1)

                const { product, trades } = results[0]

                expect(trades).to.be.an('array')
                expect(trades).to.have.lengthOf(1)

                const { productType, ticker, exchange, sector, contractSize, settlementDate } = product

                expect(productType).to.equal(product.productType)
                expect(ticker).to.equal(product.ticker)
                expect(exchange).to.equal(product.exchange)
                expect(sector).to.equal(product.sector)
                expect(contractSize).to.equal(product.contractSize)
                expect(settlementDate).to.be.equal(moment(product.settlementDate).format('DD MMMM YY'))

                const [trade] = trades

                const { price: _price, type, quantity } = trade

                expect(_price).to.be.an.instanceOf(Object)
                expect(_price.date).to.be.equal(moment(price.date).format('DD MMMM YY'))
                expect(_price.price).to.be.equal(price.price)

                expect(type).to.equal(contract.trades[0].type)
                expect(quantity).to.equal(contract.trades[0].quantity)

            })
    })

    it('should fail when the user is not exist', () => {
        const _userId = ObjectId().toString()

        return jwtPromised.sign({ sub: _userId }, SECRET)
            .then(_token => context.storage.token = _token)
            .then(() =>
                retrieveUserPortfolio()
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.exist

                        expect(error).to.be.an.instanceof(Error)
                        expect(error.message).to.equal(`user with id ${_userId} does not exist`)
                    })
            )
    })

    it('should return an error when the user do not have any trade added', () => {
        return contracts.deleteMany()
            .then(() => {
                return retrieveUserPortfolio()
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.exist

                        expect(error).to.be.an.instanceof(Error)
                        expect(error.message).to.equal('user do not have trades yet')
                    })
            })
    })

    afterEach(() =>
        Promise.all([
            users.deleteMany(),
            products.deleteMany(),
            contracts.deleteMany(),
            prices.deleteMany()
        ])
    )

    after(mongo.disconnect)
})