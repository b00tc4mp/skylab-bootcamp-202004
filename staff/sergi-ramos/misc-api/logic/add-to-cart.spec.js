require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongo } = require('../data')
const { expect } = require('chai')
const { addToCart } = require('../logic')
const { random } = Math
const { handleError } = require('../errors')


describe('logic - add-to-cart', () => {
    let users, products, cart

    before(() => mongo.connect(MONGODB_URL).then(connection => {
        users = connection.db().collection('users')
        products = connection.db().collection('product')
        cart = connection.db().collection('cart')

    }))

    let name, surname, email, password, pName, pPrice, color, description, userId, productId, _productId

    beforeEach(() => {
        return users.deleteMany()
            .then(() => products.deleteMany())
            .then(() => cart.deleteMany())
            .then(() => {

                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`

                pName = "oneplus"
                pPrice = 300
                color = "black"
                description = "muy chula"


                return users.insertOne({ name, surname, email, password })
            })
            .then(user => {
                userId = user.insertedId.toString()
                return products.insertOne({ pName, pPrice, color, description })
                    .then(product => productId = product.insertedId.toString())
            })
    })

    it('should succed on add item to cart', () => {
        addToCart(userId, productId)
            .then(message => {
                expect(message).to.exist
                expect(message).to.be.a('string')
                expect(message).to.equal("Product has been added to cart correctly")

                return cart.findOne({ userId })
                    .then(item => {
                        let product = item.products
                        expect(product[0]).to.equal(productId)
                    })

            })

    })


    describe('should add the product to the cart when one already exist', () => {
        beforeEach(() => {

            pName = "iPhone"
            pPrice = 1300
            color = "black"
            description = "muy chula"

            return products.insertOne({ pName, pPrice, color, description })
                .then(result => {
                    _productId = result.insertedId.toString()
                    return cart.insertOne({ userId, products: [_productId] })
                })
        })

        it('shoud add the second item to the cart', () => {
            addToCart(userId, productId)
                .then(message => {
                    expect(message).to.exist
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Product has been added to cart correctly")
                })
                .then(() => cart.find().toArray())
                .then(results => {
                    expect(results).to.an('array')

                    const [cart] = results

                    expect(cart.products).to.have.lengthOf(2)

                })
        })
    })

    // afterEach(() => {
    //     return users.deleteMany()
    //         .then(() => cart.deleteMany())
    //         .then(() => products.deleteMany())
    // })
    after(() => {
        return users.deleteMany()
            .then(() => cart.deleteMany())
            .then(() => products.deleteMany())
            .then(() => mongo.disconnect())
    })
})