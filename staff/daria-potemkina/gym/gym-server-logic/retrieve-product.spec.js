require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveProduct = require('./retrieve-product')
const { expect } = require('chai')
const { mongoose, models: { Product } } = require('gym-data')

describe('logic - retrieveProduct', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let option, productId

    beforeEach(async () => {
        await Product.deleteMany()

        option = {
            productType: 'option',
            exchange: "MEFF",
            ticker: "ITX",
            sector: 'Consumer',
            contractSize: 100,
            settlementDate: new Date('September 19, 2020'),
            type: {
                side: "call",
                strike: 29
            }
        }

        const _option = await Product.create(option)
        productId = _option._id.toString()
    })

    it('should return all products sorted by settlement date', async () => {
        const result = await retrieveProduct(productId)

        expect(result).to.be.an.instanceOf(Object)

        expect(result.productType).to.equal(option.productType)
        expect(result.ticker).to.equal(option.ticker)
        expect(result.exchange).to.equal(option.exchange)
        expect(result.sector).to.equal(option.sector)
        expect(result.contractSize).to.equal(option.contractSize)
        expect(result.settlementDate).to.be.an.instanceOf(Date)
        expect(result.type.strike).to.equal(option.type.strike)
        expect(result.type.side).to.equal(option.type.side)
    })

    it('should return an error when there are no products', async() => {
        await Product.deleteMany()

        try{
            await retrieveProduct(productId)

            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal(`the product con ${productId} is not exist`)
        }
    })

    it('should return a type error', () => {
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

    it('should return an error', () => {
        productId = ''
        expect(() => {
            retrieveProduct(productId)
        }).to.throw(Error, 'string is empty or blank')

        productId = '    '
        expect(() => {
            retrieveProduct(productId)
        }).to.throw(Error, 'string is empty or blank')
    })

    afterEach(() => Product.deleteMany())

    after(mongoose.disconnect)
})