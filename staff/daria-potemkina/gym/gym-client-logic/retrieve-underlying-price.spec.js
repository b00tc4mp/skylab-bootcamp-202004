require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveUnderlyingPrice = require('./retrieve-underlying-price')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
require('gym-commons/ponyfills/xhr')
const { ObjectId } = mongo

describe('logic - retrieve-underlying-price', () => {
    let underlyings, prices

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => {
            underlyings = connection.db().collection('underlyings')
            prices = connection.db().collection('prices')
        }))


    let ticker, productId

    beforeEach(() => {
        return Promise.all([
            underlyings.deleteMany(),
            prices.deleteMany()
        ])
            .then(() => {
                ticker = `ticker-${random()}`

                return underlyings.insertOne({ ticker }).then(({ insertedId }) => productId = insertedId.toString())
            })
    })

    it('should return the underglyings prices', () => {
        const price = random().toFixed(2) * 1

        return prices.insertOne({ product: ObjectId(productId), date: new Date(), price })

            .then(() => retrieveUnderlyingPrice(ticker))
            .then(results => {
                expect(results).to.be.instanceof(Array)
                expect(results).to.have.lengthOf(1)

                expect(results[0].product.toString()).to.equal(productId)
                expect(new Date(results[0].date)).to.be.an.instanceOf(Date)
                expect(results[0].price).to.equal(price)

            })
    })

    it('should return the underglyings prices', () => {
        const price1 = random().toFixed(2) * 1
        const price2 = random().toFixed(2) * 1
        const price3 = random().toFixed(2) * 1

        return prices.insertMany([{ product: ObjectId(productId), date: new Date(), price: price1 }, { product: ObjectId(productId), date: new Date('June 10, 2020'), price: price2 }, { product: ObjectId(productId), date: new Date('June 11, 2020'), price: price3 }])

            .then(() => retrieveUnderlyingPrice(ticker))
            .then(results => {
                expect(results).to.be.instanceof(Array)
                expect(results).to.have.lengthOf(3)

                expect(results[0].product.toString()).to.equal(productId)
                expect(new Date(results[0].date)).to.be.an.instanceOf(Date)
                expect(results[0].price).to.equal(price2)
                expect(results[1].product.toString()).to.equal(productId)
                expect(new Date(results[1].date)).to.be.an.instanceOf(Date)
                expect(results[1].price).to.equal(price3)
                expect(results[2].product.toString()).to.equal(productId)
                expect(new Date(results[2].date)).to.be.an.instanceOf(Date)
                expect(results[2].price).to.equal(price1)

            })
    })

    it('should return an error when the underlying does not exist', () => {
        return underlyings.deleteMany()
            .then(() => retrieveUnderlyingPrice(ticker))
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`product with ticker ${ticker} is not exist`)
            })
    })

    it('should return an error when the product does not exist', () => {
            return retrieveUnderlyingPrice(ticker)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('price not found')
            })
    })

    it('should return an error', () => {
        ticker = '   '
        expect(() => {
            retrieveUnderlyingPrice(ticker)
        }).to.throw(Error, 'string is empty or blank')

        ticker = ''
        expect(() => {
            retrieveUnderlyingPrice(ticker)
        }).to.throw(Error, 'string is empty or blank')

    })

    it('should return a type error', () => {
        ticker = undefined
        expect(() => {
            retrieveUnderlyingPrice(ticker)
        }).to.throw(TypeError, `${ticker} is not a string`)

        ticker = 123
        expect(() => {
            retrieveUnderlyingPrice(ticker)
        }).to.throw(TypeError, `${ticker} is not a string`)

        ticker = true
        expect(() => {
            retrieveUnderlyingPrice(ticker)
        }).to.throw(TypeError, `${ticker} is not a string`)
    })

    afterEach(() =>
        Promise.all([
            underlyings.deleteMany(),
            prices.deleteMany()
        ])
    )
    after(mongo.disconnect)
})