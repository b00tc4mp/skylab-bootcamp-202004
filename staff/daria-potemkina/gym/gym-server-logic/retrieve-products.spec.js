require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveProducts = require('./retrieve-products')
const { random } = Math
const { expect } = require('chai')
const chai = require('chai')
const { mongoose, models: { Product, Option } } = require('gym-data')

describe('logic - retrieveProducts', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let option, future

    beforeEach(async () => {
        await Product.deleteMany()

        option = new Product({
            productType: 'option',
            exchange: "MEFF",
            ticker: "ITX",
            sector: 'Consumer',
            contractSize: 100,
            settlementDate: 'September 19, 2020'
        })

        const option2 = new Option({
            side: "call",
            strike: 29
        })

        option.type = option2

        await option.save()

        future = new Product({
            productType: 'future',
            ticker: "BBVA",
            exchange: 'MEFF',
            sector: 'Banking',
            contractSize: 100,
            settlementDate: 'June 18, 2020',
        })

        await future.save()
    })

    it('should return all products sorted by settlement date', async () => {
        const results = await retrieveProducts()

        expect(results).to.be.an('array')
        expect(results).to.have.lengthOf(2)

        const [_future, _option] = results

        expect(_future.productType).to.equal(future.productType)
        expect(_future.ticker).to.equal(future.ticker)
        expect(_future.exchange).to.equal(future.exchange)
        expect(_future.sector).to.equal(future.sector)
        expect(_future.contractSize).to.equal(future.contractSize)
        expect(_future.settlementDate).to.equal(future.settlementDate)
        expect(_future._id).to.be.undefined

        expect(_option.productType).to.equal(option.productType)
        expect(_option.ticker).to.equal(option.ticker)
        expect(_option.exchange).to.equal(option.exchange)
        expect(_option.sector).to.equal(option.sector)
        expect(_option.contractSize).to.equal(option.contractSize)
        expect(_option.settlementDate).to.equal(option.settlementDate)
        expect(_option.type.strike).to.equal(option.type.strike)
        expect(_option.type.side).to.equal(option.type.side)
        expect(_option._id).to.be.undefined
    })

    it('should return an error when there are no products', async() => {
        await Product.deleteMany()

        try{
            await retrieveProducts()

            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal('there are no products to show')
        }
    })

    afterEach(() => Product.deleteMany())

    after(mongoose.disconnect)
})