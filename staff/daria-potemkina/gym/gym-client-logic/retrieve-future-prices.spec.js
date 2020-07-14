require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveFuturePrices = require('./retrieve-future-prices')
const { random, round } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
require('gym-commons/ponyfills/xhr')
const { ObjectId } = mongo

describe('logic - retrieve-future-prices', () => {
    let products, prices

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => {
            products = connection.db().collection('products')
            prices = connection.db().collection('prices')
        }))

    let product, productId

    beforeEach(() => {
        return Promise.all([
            products.deleteMany(),
            prices.deleteMany()
        ])
            .then(() => {
                product = {
                    productType: 'future',
                    ticker: `ticker-${random()}`,
                    exchange: `exchange-${random()}`,
                    sector: `sector-${random()}`,
                    contractSize: round(random() * 100),
                    settlementDate: new Date('September 18 2020')
                }

                return products.insertOne(product).then(({ insertedId }) => productId = insertedId.toString())
            })
    })

    it('should return the product price', () => {
        const price = random().toFixed(2) * 1

        return prices.insertOne({ product: ObjectId(productId), date: new Date(), price })

            .then(() => retrieveFuturePrices(productId))
            .then(results => {
                expect(results).to.be.instanceof(Array)
                expect(results).to.have.lengthOf(1)

                expect(results[0].product.toString()).to.equal(productId)
                expect(new Date(results[0].date)).to.be.an.instanceOf(Date)
                expect(results[0].price).to.equal(price)
            })
    })

    it('should return the product price', () => {
        const price1 = random().toFixed(2) * 1
        const price2 = random().toFixed(2) * 1
        const price3 = random().toFixed(2) * 1

        return prices.insertMany([{ product: ObjectId(productId), date: new Date(), price: price1 }, { product: ObjectId(productId), date: new Date('June 12, 2020'), price: price2 }, { product: ObjectId(productId), date: new Date('June 11, 2020'), price: price3 }])

            .then(() => retrieveFuturePrices(productId))
            .then(results => {
                expect(results).to.be.instanceof(Array)
                expect(results).to.have.lengthOf(3)

                expect(results[0].product.toString()).to.equal(productId)
                expect(new Date(results[0].date)).to.be.an.instanceOf(Date)
                expect(results[0].price).to.equal(price3)
                expect(results[1].product.toString()).to.equal(productId)
                expect(new Date(results[1].date)).to.be.an.instanceOf(Date)
                expect(results[1].price).to.equal(price2)
                expect(results[2].product.toString()).to.equal(productId)
                expect(new Date(results[2].date)).to.be.an.instanceOf(Date)
                expect(results[2].price).to.equal(price1)
            })
    })

    it('should fail when the price is not exist', () => {
        return retrieveFuturePrices(productId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('price not found')
            })
    })

    it('should return an error', () => {
        productId = '   '
        expect( () => {
            retrieveFuturePrices(productId)
        }).to.throw(Error, 'string is empty or blank')

        productId = ''
        expect( () => {
            retrieveFuturePrices(productId)
        }).to.throw(Error, 'string is empty or blank')

    })

    it('should return a type error', () => {
        productId = undefined
        expect( () => {
            retrieveFuturePrices(productId)
        }).to.throw(TypeError, `${productId} is not a string`)

        productId = 123
        expect( () => {
            retrieveFuturePrices(productId)
        }).to.throw(TypeError, `${productId} is not a string`)

        productId = true
        expect( () => {
            retrieveFuturePrices(productId)
        }).to.throw(TypeError, `${productId} is not a string`)
    })

    afterEach(() =>
        Promise.all([
            products.deleteMany(),
            prices.deleteMany()
        ])
    )
    after(mongo.disconnect)
})
