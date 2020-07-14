require('dotenv').config()

const { env: { MONGODB_URL_TEST, SECRET_TEST: SECRET } } = process

const retrieveUserAssetAllocation = require('./retrieve-user-asset-allocation')
const { random, round } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
require('gym-commons/ponyfills/xhr')
const { ObjectId } = mongo
const { utils: { jwtPromised } } = require('gym-commons')
const context = require('./context')

context.storage = {}

describe('logic - retrieveUserAssetAllocation', () => {
    let users, products, prices, contracts

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => {
            users = connection.db().collection('users')
            products = connection.db().collection('products')
            contracts = connection.db().collection('contracts')
            prices = connection.db().collection('prices')
        }))

    let user, future, option, userId, futureId, optionId, futurePriceId, optionPriceId

    beforeEach(() => {
        return Promise.all([
            users.deleteMany(),
            products.deleteMany(),
            contracts.deleteMany(),
            prices.deleteMany()
        ])
            .then(() => {
                future = {
                    productType: 'future',
                    ticker: `ticker-${random()}`,
                    exchange: 'MEFF',
                    sector: 'Utility',
                    contractSize: round(random() * 100),
                    settlementDate: new Date('June 18 2020')
                }

                option = {
                    productType: 'option',
                    ticker: `ticker-${random()}`,
                    exchange: 'EUREX',
                    sector: 'Banking',
                    contractSize: round(random() * 100),
                    settlementDate: new Date(),
                    type: {
                        side: 'call',
                        strike: round(random() * 100)
                    }
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

                return products.insertMany([future, option]).then(({ insertedIds: { '0': _future, '1': _option } }) => {
                    futureId = _future.toString()
                    optionId = _option.toString()
                })
                    .then(() => {
                        futurePrice = {
                            product: ObjectId(futureId),
                            date: new Date('June 10 2020'),
                            price: random().toFixed(2) * 1
                        }
                        optionPrice = {
                            product: ObjectId(futureId),
                            date: new Date('June 10 2020'),
                            price: random().toFixed(2) * 1
                        }

                        return prices.insertMany([futurePrice, optionPrice]).then(({ insertedIds: { '0': _futurePrice, '1': _optionPrice } }) => {
                            futurePriceId = _futurePrice.toString()
                            optionPriceId = _optionPrice.toString()
                        })
                            .then(() => users.insertOne(user)
                                .then(_user => {
                                    userId = _user.insertedId.toString()
                                    return jwtPromised.sign({ sub: _user.insertedId.toString() }, SECRET)
                                        .then(_token => context.storage.token = _token)
                                        .then(() => {
                                            futureContract = {
                                                user: ObjectId(userId),
                                                product: ObjectId(futureId),
                                                isValid: true,
                                                trades: [{
                                                    price: ObjectId(futurePriceId),
                                                    type: side[round(random())],
                                                    quantity: round(random() * 10)
                                                }]
                                            }
                                            optionContract = {
                                                user: ObjectId(userId),
                                                product: ObjectId(optionId),
                                                isValid: true,
                                                trades: [{
                                                    price: ObjectId(optionPriceId),
                                                    type: side[round(random())],
                                                    quantity: round(random() * 10)
                                                }]
                                            }
                                            return contracts.insertMany([futureContract, optionContract])
                                        })
                                }))
                    })
            })
    })

    it('should return asset allocation', () => {
        return retrieveUserAssetAllocation()
            .then(allocation => {
                const { exchange, type, sector } = allocation

                expect(exchange).to.be.an.instanceOf(Object)
                expect(type).to.be.an.instanceOf(Object)
                expect(sector).to.be.an.instanceOf(Object)

                expect(exchange.MEFF).to.equal(future.contractSize * futureContract.trades[0].quantity)
                expect(exchange.EUREX).to.equal(option.contractSize * optionContract.trades[0].quantity)

                expect(type.option).to.equal(option.contractSize * optionContract.trades[0].quantity)
                expect(type.future).to.equal(future.contractSize * futureContract.trades[0].quantity)

                expect(sector.Utility).to.equal(future.contractSize * futureContract.trades[0].quantity)
                expect(sector.Banking).to.equal(option.contractSize * optionContract.trades[0].quantity)

            })
    })

    it('should fail when the user is not exist', () => {
        const _userId = ObjectId().toString()

        return jwtPromised.sign({ sub: _userId }, SECRET)
            .then(_token => context.storage.token = _token)
            .then(() =>
                retrieveUserAssetAllocation()
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
                return retrieveUserAssetAllocation()
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