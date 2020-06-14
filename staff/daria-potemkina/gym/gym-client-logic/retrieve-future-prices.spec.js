require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveFuturePrices = require('./retrieve-future-prices')
const { random, round } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
const { ObjectId } = mongo

describe.only('logic - retrieve-future-prices', () => {
    let products, prices

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => {
            products = connection.db().collection('products')
            prices = connection.db().collection('prices')
        }))

    let product, productId

    beforeEach(() => {
        Promise.all([
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

        return prices.insertOne({ product: productId, date: new Date(), price })

            .then(() => retrieveFuturePrices(productId))
            .then(results => {
                expect(results).to.be.an('array')
                expect(results).to.have.lengthOf(1)

                expect(results[0].product.toString()).to.equal(productId)
                expect(results[0].date).to.be.an.instanceOf(Date)
                expect(results[0].price).to.equal(price)
            })
    }
    )

    afterEach(() =>
        Promise.all([
            products.deleteMany(),
            prices.deleteMany()
        ])
    )
    after(mongo.disconnect)
})
