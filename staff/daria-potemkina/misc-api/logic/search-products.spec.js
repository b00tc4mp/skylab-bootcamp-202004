require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const searchProducts = require('./search-products')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('../data')

describe('logic - searchProducts', () => {
    let products

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => products = connection.db().collection('products')))

    let name, description, price, url, query

    beforeEach(() => {
        return products.deleteMany()
            .then(() => {
                name = `name-${random()}`
                description = `description-${random()}`
                price = random()
                url = `https://url-${random()}`

                const product = { name, description, price, url }

                return products.insertOne(product)
            })
    })

    it('should return a result from search', () => {
        query = 'description'
        searchProducts(query)
            .then(results => {
                expect(results).to.be.an('array')
                expect(results).to.have.lengthOf(1)

                const [result] = results

                expect(result.name).to.equal(name)
                expect(result.description).to.equal(description)
                expect(result.price).to.equal(price)
                expect(result.url).to.equal(url)
            })
    })

    it('should return an empty array when there are no results', () => {
        query = 'pepito'

        searchProducts(query)
            .then(results => {
                expect(results).to.be.an('array')
                expect(results).to.have.lengthOf(0)

            })
    })

    it('should return a type error', () => {
    query = undefined
        expect(() => {
            searchProducts(query)
        }).to.throw(TypeError, `${query} is not a string`)

        query = 123
        expect(() => {
            searchProducts(query)
        }).to.throw(TypeError, `${query} is not a string`)

        query = true
        expect(() => {
            searchProducts(query)
        }).to.throw(TypeError, `${query} is not a string`)
    })

    it('should return an error', () => {
        query = ''
        expect(() => {
            searchProducts(query)
        }).to.throw(Error, `${query} is empty or blank`)

        query = '    '
        expect(() => {
            searchProducts(query)
        }).to.throw(Error, `${query} is empty or blank`)
    })

    afterEach(() => products.deleteMany({}))

    after(() => products.deleteMany({}).then(mongo.disconnect))
})

