require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const addCart = require('./add-to-cart')
const { expect } = require('chai')
const { mongo } = require('../data')
const { random } = Math

describe(('add to cart'), () => {
    let carts

    before(() => {
        mongo.connect(MONGODB_URL)
            .then(connection => carts = connection.db().collection('carts'))

    })

    let userId, productId

    beforeEach(() => {
        carts.deleteMany()
            .then(() => {
                userId = `${random()}`
                productId = `product-${random()}`
            })

    })

  /*   it('guen todo bien', () => {
        addCart(userId, productId)
            .then(return carts.findOne(userId))
        .then(cart => {

        }) */
})
afterEach(() => carts.deleteMany())
after(() => carts.deleteMany().then(mongo.disconnect))






