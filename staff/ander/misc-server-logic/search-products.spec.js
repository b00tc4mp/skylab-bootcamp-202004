require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const searchProducts = require('./search-products')
const { expect } = require('chai')
require('misc-commons/polyfills/json')
require('misc-commons/polyfills/math')
const { random, randomIntegerBetween } = Math
const { mongo } = require('misc-data')
const { ObjectId } = mongo
const {errors: { UnexistenceError, ValueError }} = require('../misc-data')

describe.only('logic - search products', () => {
    let products, query, name, description,price,productId

    before(() =>
        mongo.connect(MONGODB_URL).then(connection => {
            const db = connection.db()
            products = db.collection('products')
        })
    )

    beforeEach(() =>
        products.deleteMany()
            .then(() => {
                const product = {
                    name: `name-${random()}`,
                    description: `description-${random()}`,
                    price: random() * 1000
                }

                name = product.name
                description = product.description
                price = product.price

                return products.insertOne(product).then(({ insertedId }) => productId = insertedId.toString())   
            })
    )

    it('should succeed on search a product with query name', () =>

        searchProducts(query = name)
            .then((result)=> {
                expect(result).to.exist
                expect(result).to.have.lengthOf(1)
                const [_result] = result
                expect(_result.name).to.equal(name)
                expect(_result.description).to.equal(description)
                expect(_result.price).to.equal(price)
                expect(_result.id).to.equal(productId)
            })
    )
    
    it('should succeed on search a product with query description', () =>
        searchProducts(query = description)
            .then((result)=> {
                expect(result).to.exist
                expect(result).to.have.lengthOf(1)
                const [_result] = result
                expect(_result.name).to.equal(name)
                expect(_result.description).to.equal(description)
                expect(_result.price).to.equal(price)
                expect(_result.id).to.equal(productId)
            })
    )

    it('should fail on find  results', () =>
        searchProducts(query = `${name}${description}`)
            .then(() => { throw new Error('it should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal("not found any results")
            })
    )
    
    it('should fail on non-string product id', () => {
        expect(() => searchProducts(true))
            .to.throw(TypeError, `true is not a string`)

        expect(() => searchProducts(1))
            .to.throw(TypeError, `1 is not a string`)
    })

    
    // it('should fail when user does not exist', () =>
    //     updateCart(userId = ObjectId().toString(), productId, 1)
    //         .then(() => { throw new Error('it should not reach this point') })
    //         .catch(error => {
    //             expect(error).to.exist

    //             expect(error).to.be.instanceOf(UnexistenceError)
    //             expect(error.message).to.equal(`user with id ${userId} does not exist`)
    //         })
    // )

    // it('should fail when product does not exist', () =>
    //     updateCart(userId, productId = ObjectId().toString(), 1)
    //         .then(() => { throw new Error('it should not reach this point') })
    //         .catch(error => {
    //             expect(error).to.exist

    //             expect(error).to.be.instanceOf(UnexistenceError)
    //             expect(error.message).to.equal(`product with id ${productId} does not exist`)
    //         })
    // )

    afterEach(() =>products.deleteMany())

    after(() => mongo.disconnect())
})