require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveOptions = require('./retrieve-options')
const { random, round } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
require('gym-commons/ponyfills/xhr')
const { ObjectId } = mongo

describe('logic - retrieve-options', () => {
    let products, prices

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => {
            products = connection.db().collection('products')
            prices = connection.db().collection('prices')
        }))

    let product, productId, price, priceId

    beforeEach(() => {
        return Promise.all([
            products.deleteMany(),
            prices.deleteMany()
        ])
            .then(() => {
                product = {
                    productType: 'option',
                    ticker: `ticker-${random()}`,
                    exchange: `exchange-${random()}`,
                    sector: `sector-${random()}`,
                    contractSize: round(random() * 100),
                    settlementDate: new Date('September 18 2020'),
                    type: {
                        side: 'call',
                        strike: round(random() * 100)
                    }
                }

                return products.insertOne(product).then(({ insertedId }) => productId = insertedId.toString())
                    .then(() => {
                        price = {
                            product: ObjectId(productId),
                            date: new Date(),
                            price: random().toFixed(2) * 1
                        }

                        return prices.insertOne(price).then(({ insertedId }) => priceId = insertedId.toString())
                    })
            })
    })

    it('should return a product details', () => {
        return retrieveOptions()
            .then(options => {
                expect(options).to.be.an('array')
                expect(options).to.have.lengthOf(1)

                const [option] = options

                expect(option._id.toString()).to.equal(productId)
                expect(option.ticker).to.equal(product.ticker)
                expect(option.settlementDate).to.equal('September 20')
                expect(option.type.side).to.equal(product.type.side)
                expect(option.type.strike).to.equal(product.type.strike)
                expect(option.priceId).to.equal(priceId)
                expect(option.price).to.equal(price.price)
            })
    })

    it('should fail when the product is not exist', () => {
        return products.deleteMany()
            .then(() => {
                return retrieveOptions()
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.an.instanceof(Error)
                        expect(error.message).to.equal('there are no products to show')
                    })
            })
    })

    it('should fail when the price is not exist', () => {
        return prices.deleteMany()
            .then(() => {
                return retrieveOptions()
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.an.instanceof(Error)
                        expect(error.message).to.equal('price not found')
                    })
            })
    })

    afterEach(() =>
        Promise.all([
            products.deleteMany(),
            prices.deleteMany()
        ])
    )
    after(mongo.disconnect)
})