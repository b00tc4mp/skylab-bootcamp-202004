require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const updateCart = require('./update-cart')
const { random } = Math
const { expect } = require('chai')
require('../utils/polyfills/json')
const { mongo } = require('../data')
const { ObjectId } = mongo

describe('logic - update cart', () => {
    let users
    let products

    before(() =>
        mongo.connect(MONGODB_URL)
            .then(connection => {
                users = connection.db().collection('users')
                products = connection.db().collection('products')
            })
    )

    let userId, productId, quantity

    beforeEach(() =>
        Promise.all([
            users.deleteMany(),
            products.deleteMany()
        ])
            .then(() => {
                quantity = random() + 1

                const user = {
                    name: `name-${random()}`,
                    surname: `surname-${random()}`,
                    email: `e-${random()}@mail.com`,
                    password: `password-${random()}`

                }
                const product = {
                    productName: `name-${random()}`,
                    description: `description-${random()}`,
                    price: random() + 1,
                    url: 'http://thisisimg.jpg'
                }

                return Promise.all([
                    users.insertOne(user).then(({ insertedId }) => userId = insertedId.toString()),
                    products.insertOne(product).then(({ insertedId }) => productId = insertedId.toString())
                ])
            })
    )

    describe('when product exists', () => {

        it('should succeed on valid product input', () =>
            updateCart(userId, productId, quantity)
                .then(result => {
                    expect(result).to.be.undefined

                    return users.findOne({ _id: ObjectId(userId) })
                })
                .then(user => {

                    const { cart } = user

                    const [_product] = cart

                    expect(user).to.exist
                    expect(cart.length).to.equal(1)

                    expect(_product).to.exist
                    expect(_product.product.toString()).to.equal(productId)
                    expect(_product.quantity).to.equal(quantity)

                })
        )
        it('should fail with unexisting userId', () =>

            updateCart('5ed4d71d9569dfdc03e519f8', productId, quantity)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist

                    expect(error).to.be.an.instanceOf(Error)
                    expect(error.message).to.equal(`user with id 5ed4d71d9569dfdc03e519f8 does not exist`)
                })

        )
        it('should fail with unexisting userId', () =>

            updateCart(userId, productId, 0)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist

                    expect(error).to.be.an.instanceOf(Error)
                    expect(error.message).to.equal(`product with id ${productId} does not exist in cart for user with id ${userId}`)
                })

        )
    })

    afterEach(() =>
        Promise.all([
            users.deleteMany(),
            products.deleteMany()
        ])
    )

    after(() => mongo.disconnect())
})