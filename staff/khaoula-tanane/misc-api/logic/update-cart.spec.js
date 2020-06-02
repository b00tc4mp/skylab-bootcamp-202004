require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const updateCart = require('./update-cart')
const { expect } = require('chai')
require('../utils/polyfills/json')
require('../utils/polyfills/math')
const { random, randomIntegerBetween } = Math
const { mongo } = require('../data')
const { ObjectId } = mongo
const { UnexistenceError, ValueError } = require('../errors')

describe('logic - update cart', () => {
    let users, products

    before(() =>
        mongo.connect(MONGODB_URL).then(connection => {
            const db = connection.db()

            users = db.collection('users')

            products = db.collection('products')
        })
    )

    let userId, productId, quantity

    beforeEach(() =>
        Promise.all([
            users.deleteMany(),
            products.deleteMany()
        ])
            .then(() => {
                const user = {
                    name: `name-${random()}`,
                    surname: `surname-${random()}`,
                    email: `e-${random()}@mail.com`,
                    password: `password-${random()}`
                }

                const product = {
                    name: `name-${random()}`,
                    description: `description-${random()}`,
                    price: random() * 1000,
                    url: `url-${random()}`
                }

                quantity = randomIntegerBetween(1, 100)

                return Promise.all([
                    users.insertOne(user).then(({ insertedId }) => userId = insertedId.toString()),
                    products.insertOne(product).then(({ insertedId }) => productId = insertedId.toString())
                ])
            })
    )

    it('should succeed on existing user and product', () =>
        updateCart(userId, productId, quantity)
            .then(result => {
                expect(result).to.be.undefined

                return users.findOne({ _id: ObjectId(userId) })
            })
            .then(user => {
                expect(user).to.exist

                const { cart } = user

                expect(cart).to.exist
                expect(cart).to.have.lengthOf(1)

                const [_product] = cart

                expect(_product).to.exist

                const { product, quantity: _quantity } = _product

                expect(product.toString()).to.equal(productId)
                expect(_quantity).to.equal(quantity)
            })
    )

    it('should fail on trying to remove a whole product that is not already in cart', () =>
        updateCart(userId, productId, quantity = 0)
            .then(() => { throw new Error('it should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`product with id ${productId} does not exist in cart for user with id ${userId}`)
            })
    )

    it('should fail on negative quantity', () => {
        quantity = -1

        expect(() => updateCart(userId, productId, quantity))
            .to.throw(ValueError, `${quantity} is not a positive number`)
    })

    it('should fail on non-string user id', () => {
        expect(() => updateCart(true, productId, quantity))
            .to.throw(TypeError, `true is not a string`)

        expect(() => updateCart(1, productId, quantity))
            .to.throw(TypeError, `1 is not a string`)
    })

    it('should fail on non-string product id', () => {
        expect(() => updateCart(userId, true, quantity))
            .to.throw(TypeError, `true is not a string`)

        expect(() => updateCart(userId, 1, quantity))
            .to.throw(TypeError, `1 is not a string`)
    })

    it('should fail on non-numeric quantity', () => {
        expect(() => updateCart(userId, productId, true))
            .to.throw(TypeError, `true is not a number`)

        expect(() => updateCart(userId, productId, 'abc'))
            .to.throw(TypeError, `abc is not a number`)

        expect(() => updateCart(userId, productId, NaN))
            .to.throw(TypeError, `NaN is not a number`)
    })

    it('should fail when user does not exist', () =>
        updateCart(userId = ObjectId().toString(), productId, 1)
            .then(() => { throw new Error('it should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            })
    )

    it('should fail when product does not exist', () =>
        updateCart(userId, productId = ObjectId().toString(), 1)
            .then(() => { throw new Error('it should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`product with id ${productId} does not exist`)
            })
    )

    afterEach(() =>
        Promise.all([
            users.deleteMany(),
            products.deleteMany()
        ])
    )

    after(() => mongo.disconnect())
})