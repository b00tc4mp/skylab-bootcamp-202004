require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrievePrices = require('./retrieve-prices')
const { random, round } = Math
const { expect } = require('chai')
const { mongoose, models: { Product, Price } } = require('gym-data')
const { ObjectId } = mongoose

describe.only('logic - retrievePrices', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let future, futureId, dateToday, dateD_1, dateD_2, futurePrice, _futurePrice, productId, number

    beforeEach(async () => {
        await Product.deleteMany()
        await Price.deleteMany()

        future = {
            productType: 'future',
            ticker: "BBVA",
            exchange: 'MEFF',
            sector: 'Banking',
            contractSize: 100,
            settlementDate: 'Jun 18, 2020'
        }

        const product = await Product.create(future)
        futureId = product._id.toString()

        const date = new Date()

        dateToday = date.toString().split(' ').slice(1, 4).join(' ')
        dateD_1 = (new Date(date.setDate(date.getDate() - 1))).toString().split(' ').slice(1, 4).join(' ')
        dateD_2 = (new Date(date.setDate(date.getDate() - 2))).toString().split(' ').slice(1, 4).join(' ')

        const price = await Price.create({ product: futureId, date: dateToday, price: round(random() * 100) / 100 })
        futurePrice = price.price
        const _price = await Price.create({ product: futureId, date: dateD_1, price: round(random() * 100) / 100 })
        _futurePrice = _price.price
    })

    it('should return all product prices', async() => {
        const prices = await retrievePrices(futureId)

        expect(prices).to.be.an('array')
        expect(prices).to.have.lengthOf(2)
        expect(prices[0].price).to.equal(futurePrice)
        expect(prices[0].date).to.equal(dateToday)
        expect(prices[1].price).to.equal(_futurePrice)
        expect(prices[1].date).to.equal(dateD_1)

    })

    it('should return the number of prices passed', async() => {
        const num = 1
        const prices = await retrievePrices(futureId, num)

        expect(prices).to.be.an('array')
        expect(prices).to.have.lengthOf(1)
        expect(prices[0].price).to.equal(futurePrice)
        expect(prices[0].date).to.equal(dateToday)
    })

    it('it should fail when the product is not exists', async() => {
        productId = ObjectId().toString()

        try{
            await retrievePrices(productId)

            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal('price not found')
        }
    })

    it('should return a type error', async() => {
        productId = undefined

        expect(() => {
            retrievePrices(productId)
        }).to.throw(TypeError, `${productId} is not a string`)

        productId = 123
        expect(() => {
            retrievePrices(productId)
        }).to.throw(TypeError, `${productId} is not a string`)

        productId = true
        expect(() => {
            retrievePrices(productId)
        }).to.throw(TypeError, `${productId} is not a string`)

        number = true
        expect(() => {
            retrievePrices(futureId, number)
        }).to.throw(Error, `${number} is not a number`)

    })

    it('should return an error', () => {
        productId = ''
        expect(() => {
            retrievePrices(productId)
        }).to.throw(Error, 'string is empty or blank')

        productId = '    '
        expect(() => {
            retrievePrices(productId)
        }).to.throw(Error, 'string is empty or blank')

        number = 2.4
        expect(() => {
            retrievePrices(futureId, number)
        }).to.throw(Error, `${number} is not an integer number`)

        number = -2
        expect(() => {
            retrievePrices(futureId, number)
        }).to.throw(Error, `${number} is not a positive number`)
    })
    

    afterEach(async() => {
        await Product.deleteMany()
        await Price.deleteMany()
    })

    after(mongoose.disconnect)
})