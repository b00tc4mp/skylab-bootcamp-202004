require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const searchProducts = require('./search-products')
const { random, floor } = Math
const { expect } = require('chai')
const { mongo } = require('../data')
const { ObjectId } = mongo
const { UnexistenceError } = require('../errors')

describe('logic - search products', () => {
    let users, products

    before(() => mongo.connect(MONGODB_URL_TEST).then(connection => {
        products = connection.db().collection('products')
    }))

    let name, description, price, productId

    beforeEach(() =>
        products.deleteMany()
            .then(() => {
                name = `car-${random()}`,
                description = `description-${random()}`,
                price = random() * 1000
        
                return products.insertOne({name, price, description})                
            })
    )

    it('should return the product searched by name if it exists', () => {
        const query = name
        return searchProducts(query)
            .then(results => {
                expect(results).to.have.lengthOf(1)

                const [result] = results

                const { name:_name, description: _description, price:_price } = result

                expect(_name).to.equal(name)
                expect(_description).to.equal(_description)
                expect(_price).to.equal(price)
            })
    })

    it('should return the product searched by description if it exists', () => {
        const query = description
        return searchProducts(query)
            .then(results => {
                expect(results).to.have.lengthOf(1)

                const [result] = results

                const { name:_name, description: _description, price:_price } = result

                expect(_name).to.equal(name)
                expect(_description).to.equal(_description)
                expect(_price).to.equal(price)
            })
    })

    it('should fail when query is not an string', () =>
        expect(() => {
            searchProducts(true)
        }).to.throw(TypeError, 'true is not a string')   
    )

    afterEach(() => products.deleteMany())

    after(() => mongo.disconnect())
})