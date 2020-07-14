require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const searchProducts = require('./search-products')
const { random, round } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
const { ObjectId } = mongo
require('gym-commons/polyfills/json')
require('gym-commons/ponyfills/xhr')
const moment = require('moment')

describe('logic - search-products', () => {
    let products, prices

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => {
            products = connection.db().collection('products')
            prices = connection.db().collection('prices')
        }))

    let future, futurePrice, futurePriceId, option, optionPrice, optionPriceId, type, sector, ticker, market, _type, _sector, _ticker, _market

    beforeEach(() => {
        return Promise.all([
            products.deleteMany(),
            prices.deleteMany()
        ])
            .then(() => {
                future = {
                    productType: 'future',
                    ticker: `ticker-${random()}`,
                    exchange: `exchange-${random()}`,
                    sector: `sector-${random()}`,
                    contractSize: round(random() * 100),
                    settlementDate: new Date('September 18 2020')
                }

                option = {
                    productType: 'option',
                    ticker: `ticker-${random()}`,
                    exchange: `exchange-${random()}`,
                    sector: `sector-${random()}`,
                    contractSize: round(random() * 100),
                    settlementDate: new Date('September 18 2020'),
                    type: {
                        side: "call",
                        strike: round(random() * 100)
                    }
                }


                return Promise.all([products.insertOne(future).then(_future => futureId = _future.insertedId.toString())
                    .then(() => {
                        futurePrice = {
                            product: ObjectId(futureId),
                            date: new Date(),
                            price: random().toFixed(2) * 1
                        }
                        return prices.insertOne(futurePrice).then(({insertedId}) => futurePriceId = insertedId.toString())
                    }),
                products.insertOne(option).then(_option => optionId = _option.insertedId.toString())
                    .then(() => {
                        optionPrice = {
                            product: ObjectId(optionId),
                            date: new Date(),
                            price: random().toFixed(2) * 1
                        }
                        return prices.insertOne(optionPrice).then(({insertedId}) => optionPriceId = insertedId.toString())
                    })
                ])
            })
    })

    it('should return results due parameters passed', () => {
        sector = future.sector
        return searchProducts(undefined, sector)
        .then(results => {
            expect(results).to.be.an('array')
            expect(results).to.have.lengthOf(1)

            const [result] = results

            expect(result._id.toString()).to.equal(futureId)
            expect(result.productType).to.equal(future.productType)
            expect(result.ticker).to.equal(future.ticker)
            expect(result.exchange).to.equal(future.exchange)
            expect(result.sector).to.equal(future.sector)
            expect(result.contractSize).to.equal(future.contractSize)
            expect(result.settlementDate).to.equal(moment(future.settlementDate).format('MMMM YY'))
            expect(result.price).to.equal(futurePrice.price)
            expect(result.priceId).to.equal(futurePriceId)

        })
    })

    it('should fail when the product not found', () => {
        market = 'NY'
        return products.deleteMany()
        .then(() => {
            return searchProducts(undefined, undefined, undefined, market)
            .then(() => {'should not reach this point'})
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('no results')
            })
        })
    })


    it('should fail when the price is not exist', () => {
        ticker = option.ticker
        return prices.deleteMany()
            .then(() => {
                return searchProducts(undefined, undefined, ticker)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.an.instanceof(Error)
                        expect(error.message).to.equal('price not found')
                    })
            })
    })

    it('should return an type error', () => {
        _type = 123
        expect(() => {
            searchProducts(_type)
        }).to.throw(TypeError, `${_type} is not a string`)

        _type = true
        expect(() => {
            searchProducts(_type)
        }).to.throw(TypeError, `${_type} is not a string`)

        _sector = 123
        expect(() => {
            searchProducts(undefined, _sector)
        }).to.throw(TypeError, `${_sector} is not a string`)

        _sector = true
        expect(() => {
            searchProducts(undefined, _sector)
        }).to.throw(TypeError, `${_sector} is not a string`)

        _ticker = 123
        expect(() => {
            searchProducts(undefined, undefined, _ticker)
        }).to.throw(TypeError, `${_ticker} is not a string`)

        _ticker = true
        expect(() => {
            searchProducts(undefined, undefined, _ticker)
        }).to.throw(TypeError, `${_type} is not a string`)

        _market = 123
        expect(() => {
            searchProducts(undefined, undefined, undefined, _market)
        }).to.throw(TypeError, `${_market} is not a string`)

        _market = true
        expect(() => {
            searchProducts(undefined, undefined, undefined, _market)
        }).to.throw(TypeError, `${_market} is not a string`)
    })


    it('should return an error', () => {
        _type = ''
        expect(() => {
            searchProducts(_type)
        }).to.throw(Error, 'string is empty or blank')

        _type = '    '
        expect(() => {
            searchProducts(_type)
        }).to.throw(Error, 'string is empty or blank')

        _sector = ''
        expect(() => {
            searchProducts(undefined, _sector)
        }).to.throw(Error, 'string is empty or blank')

        _sector = '    '
        expect(() => {
            searchProducts(undefined, _sector)
        }).to.throw(Error, 'string is empty or blank')

        _ticker = ''
        expect(() => {
            searchProducts(undefined, undefined, _ticker)
        }).to.throw(Error, 'string is empty or blank')

        _ticker = '    '
        expect(() => {
            searchProducts(undefined, undefined, _ticker)
        }).to.throw(Error, 'string is empty or blank')

        _market = ''
        expect(() => {
            searchProducts(undefined, undefined, undefined, _market)
        }).to.throw(Error, 'string is empty or blank')

        _market = '    '
        expect(() => {
            searchProducts(undefined, undefined, undefined, _market)
        }).to.throw(Error, 'string is empty or blank')
    })



    afterEach(() =>
        Promise.all([
            products.deleteMany(),
            prices.deleteMany()
        ])
    )

    after(mongo.disconnect)
})