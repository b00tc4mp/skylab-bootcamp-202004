require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveUnderlyings = require('./retrieve-underlyings')
const { random, round } = Math
const { expect } = require('chai')
const { mongoose, models: { Underlying, Price } } = require('gym-data')

describe('logic - retrieveUnderlyings', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let underlying, productId, underlyingPrice, _underlyingPrice, _ticker

    beforeEach(async () => {
        await Underlying.deleteMany()
        await Price.deleteMany()

        underlying = {
            ticker: "BBVA",
        }

        const product = await Underlying.create(underlying)
        productId = product._id.toString()

        const date = new Date()

        dateToday = date.toString().split(' ').slice(1, 4).join(' ')
        dateD_1 = (new Date(date.setDate(date.getDate() - 1))).toString().split(' ').slice(1, 4).join(' ')

        const price = await Price.create({ product: productId, date: dateToday, price: round(random() * 100) / 100 })
        underlyingPrice = price.price
        const _price = await Price.create({ product: productId, date: dateD_1, price: round(random() * 100) / 100 })
        _underlyingPrice = _price.price
    })

    it('should return the underlying by ticker with historic prices', async() => {
        ticker = underlying.ticker

        const result = await retrieveUnderlyings(ticker)

        expect(result).to.be.an('array')
        expect(result).to.have.lengthOf(2)
        expect(result[0].price).to.equal(underlyingPrice)
        expect(result[0].date.toString().split(' ').slice(1, 4).join(' ')).to.equal(dateToday)
        expect(result[1].price).to.equal(_underlyingPrice)
        expect(result[1].date.toString().split(' ').slice(1, 4).join(' ')).to.equal(dateD_1)

        expect(result[0]._id).to.be.undefined
        expect(result[0].__v).to.be.undefined
        expect(result[0].user).to.be.undefined
        expect(result[1]._id).to.be.undefined
        expect(result[1].__v).to.be.undefined
        expect(result[1].user).to.be.undefined

    })

    it('should fail id the product ticker is not exist', async() => {
        _ticker = 'AAA'

        try{
            await retrieveUnderlyings(_ticker)

            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal(`product with ticker ${_ticker} is not exist`)
        }
    })

    it('should fail id the product ticker is not exist', async() => {
        await Price.deleteMany()

        try{
            await retrieveUnderlyings(ticker)

            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal('price not found')
        }
    })

    it('should return a type error', async() => {
        _ticker = undefined

        expect(() => {
            retrieveUnderlyings(_ticker)
        }).to.throw(TypeError, `${_ticker} is not a string`)

        _ticker = 123
        expect(() => {
            retrieveUnderlyings(_ticker)
        }).to.throw(TypeError, `${_ticker} is not a string`)

        _ticker = true
        expect(() => {
            retrieveUnderlyings(_ticker)
        }).to.throw(TypeError, `${_ticker} is not a string`)
    })

    it('should return an error', () => {
        _ticker = ''
        expect(() => {
            retrieveUnderlyings(_ticker)
        }).to.throw(Error, 'string is empty or blank')

        _ticker = '    '
        expect(() => {
            retrieveUnderlyings(_ticker)
        }).to.throw(Error, 'string is empty or blank')
    })

    afterEach(async () => {
        await Underlying.deleteMany()
        await Price.deleteMany()
    })

    after(mongoose.disconnect)
})
