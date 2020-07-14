require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveProduct = require('./retrieve-product')
const { random, round } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
require('gym-commons/ponyfills/xhr')
const { ObjectId } = mongo

describe('logic - retrieve-product', () => {
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
        return retrieveProduct(productId)
            .then(product => {
                expect(product).to.be.instanceOf(Object)

                expect(product._id.toString()).to.equal(productId)
                expect(product.ticker).to.equal(product.ticker)
                expect(product.settlementDate).to.equal('September 20')
                expect(product.priceId).to.equal(priceId)
                expect(product.price).to.equal(price.price)
            })
    })

    it('should fail when the product is not exist', () => {
        return products.deleteMany()
            .then(() => {
                return retrieveProduct(productId)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.an.instanceof(Error)
                        expect(error.message).to.equal(`the product con ${productId} is not exist`)
                    })
            })
    })

    it('should fail when the price is not exist', () => {
        return prices.deleteMany()
            .then(() => {
                return retrieveProduct(productId)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.an.instanceof(Error)
                        expect(error.message).to.equal('price not found')
                    })
            })
    })

    it('should return an type error when synchronous error exists', () => {
        productId = undefined
        expect(() => {
            retrieveProduct(productId)
        }).to.throw(TypeError, `${productId} is not a string`)

        productId = 123
        expect(() => {
            retrieveProduct(productId)
        }).to.throw(TypeError, `${productId} is not a string`)

        productId = true
        expect(() => {
            retrieveProduct(productId)
        }).to.throw(TypeError, `${productId} is not a string`)

    })

    it('should return an error when synchronous error exists', () => {
        productId = ''

        expect(() => {
            retrieveProduct(productId)
        }).to.throw(Error, `string is empty or blank`)

        productId = '     '

        expect(() => {
            retrieveProduct(productId)
        }).to.throw(Error, `string is empty or blank`)

    })

    afterEach(() =>
        Promise.all([
            products.deleteMany(),
            prices.deleteMany()
        ])
    )
    after(mongo.disconnect)
})