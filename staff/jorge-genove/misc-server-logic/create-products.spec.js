require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const createProduct = require('./create-products')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('misc-data')

describe('logic-add-cart', () => {
    let carts

    before(() => mongo.connect(MONGODB_URL)
        .then(connection => products = connection.db().collection('products')))

    let name, description, price, url

    beforeEach(() =>

        products.deleteMany()
            .then(() => {
                name = `name-${random()}`
                description = `description-${random()}`
                price = `${random()}`
                url = `www.${random()}.com`
            })
    )

    it('should succed on valid data', () =>
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

    describe('should fail if the product already exist', () => {
        beforeEach(() => {
            const product = { name, description, price, url }

            return products.insertOne(product)
        })

        it('should fail trying to add a existing product', () => 
            createProduct(name, description, price, url)
                .then(() => {
                    throw new Error('should not  reach this point')})
                        .catch(error => {
                            expect(error).to.exist
                            expect(error).to.be.an.instanceOf(Error)
                            expect(error.message).to.equal(`Product with that ${name} already exist`)
                        })
            )
        })
        afterEach(() => products.deleteMany())

        after(() => products.deleteMany({}).then(mongo.disconnect))
    })

