require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const searchProducts = require('./search-products')
const { random, round } = Math
const { expect } = require('chai')
const { mongoose, models: { Product } } = require('gym-data')

describe('logic - searchProducts', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let future, _type, _sector, _ticker, _market

    beforeEach(async () => {
        await Product.deleteMany()

        future = {
            productType: 'future',
            ticker: `ticker-${random()}`,
            exchange: `exchange-${random()}`,
            sector: `sector-${random()}`,
            contractSize: round(random() * 100),
            settlementDate: new Date('September 18 2020')
        }

        await Product.create(future)
    })

    it('should return a result by one parameter', async () => {
        const type = future.productType

        const results = await searchProducts(type)

        expect(results).to.be.an('array')
        expect(results).to.have.lengthOf(1)
        expect(results[0].productType).to.equal(future.productType)
        expect(results[0].ticker).to.equal(future.ticker)
        expect(results[0].exchange).to.equal(future.exchange)
        expect(results[0].sector).to.equal(future.sector)
        expect(results[0].contractSize).to.equal(future.contractSize)
        expect(results[0].settlementDate).to.be.an.instanceOf(Date)
        expect(results[0]._id).to.exist
        expect(results[0].__v).to.be.undefined
    })

    it('should return a result by one parameter', async () => {
        const sector = future.sector

        const results = await searchProducts(undefined, sector)

        expect(results).to.be.an('array')
        expect(results).to.have.lengthOf(1)
        expect(results[0].productType).to.equal(future.productType)
        expect(results[0].ticker).to.equal(future.ticker)
        expect(results[0].exchange).to.equal(future.exchange)
        expect(results[0].sector).to.equal(future.sector)
        expect(results[0].contractSize).to.equal(future.contractSize)
        expect(results[0].settlementDate).to.be.an.instanceOf(Date)
        expect(results[0]._id).to.exist
        expect(results[0].__v).to.be.undefined
    })

    it('should return a result by more than one parameter', async () => {
        const exchange = future.exchange
        const ticker = future.ticker

        const results = await searchProducts(undefined, undefined, ticker, exchange)

        expect(results).to.be.an('array')
        expect(results).to.have.lengthOf(1)
        expect(results[0].productType).to.equal(future.productType)
        expect(results[0].ticker).to.equal(future.ticker)
        expect(results[0].exchange).to.equal(future.exchange)
        expect(results[0].sector).to.equal(future.sector)
        expect(results[0].contractSize).to.equal(future.contractSize)
        expect(results[0].settlementDate).to.be.an.instanceOf(Date)
        expect(results[0]._id).to.exist
        expect(results[0].__v).to.be.undefined
    })

    it('should fail if return no results', async () => {
        await Product.deleteMany()

        const exchange = future.exchange
        const ticker = future.ticker

        try {
            await searchProducts(undefined, undefined, ticker, exchange)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal('no results')
        }
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

afterEach(async () => {
    await Product.deleteMany()
})

after(mongoose.disconnect)
})