require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const createProduct = require('./create-product')
const { random } = Math
const { expect } = require('chai')
require('misc-commons/polyfills/json')
const { mongo } = require('misc-data')

describe('logic - create- products', () => {
    let products

    before(() =>
        mongo.connect(MONGODB_URL)
            .then(connection => products = connection.db().collection('products'))
    )

    let name, description, price, url

    beforeEach(() =>
        products.deleteMany()
            .then(() => {
                name = `name-${random()}`
                description= `description${random()}`
                price = (random()*20)
                url = `http://${random()}`

            })
    )

    it('should succeed on valid data', () =>
        createProduct(name, description, price, url)
            .then(() => products.find().toArray())
            .then(products => {
                expect(products.length).to.equal(1)

                const [product] = products

                expect(product.name).to.equal(name)
                expect(product.description).to.equal(description)
                expect(product.price).to.equal(price)
                expect(product.url).to.equal(url)
            })
    )

    describe('when product already exists', () => {
        beforeEach(() => {
            const product = { name, description, price, url }

            return products.insertOne(product)
        })
    })

    afterEach(() => products.deleteMany())

    after(() => products.deleteMany({}).then(mongo.disconnect))
})