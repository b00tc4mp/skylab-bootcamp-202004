require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveCart = require('./retrieve-cart')
const { random, floor } = Math
const { expect } = require('chai')
const { mongo } = require('misc-data')
const { errors: { UnexistenceError } } = require('misc-commons')
const { ObjectId } = mongo

describe('logic - retrieveCart', () => {
    let products, users

    before(() =>
        mongo.connect(MONGODB_URL_TEST)
            .then(connection => {
                users = connection.db().collection('users')
                products = connection.db().collection('products')
            })
    )

    let user, product, _quantity

    beforeEach(() => {
        return Promise.all([users.deleteMany(), products.deleteMany()])
            .then(() => {
                user = {
                    name: `name-${random()}`,
                    surname: `surname-${random()}`,
                    email: `e-${random()}@mail.com`,
                    password: `password-${random()}`,
                }

                product = {
                    _name: `car-${random()}`,
                    description: `description-${random()}`,
                    price: random() * 1000
                }

                _quantity = floor(random() * 10)

                return products.insertOne(product)
                    .then(_product => {
                        productId = _product.insertedId.toString()
                        user.cart = [{ product: productId, quantity: _quantity }]

                        return users.insertOne(user).then(_user => userId = _user.insertedId.toString())
                    })
            })
    })

    it('should return the user cart with products', () => {
        return retrieveCart(userId)
            .then(result => {
                const [cart] = result

                expect(cart.product).to.equal(productId)
                expect(cart.quantity).to.equal(_quantity)
            })
    })

    it('should return an error when the cart does not exist', () => {
        return users.updateOne({ _id: ObjectId(userId) }, { $set: { cart: [] } })
            .then(() => {
                return retrieveCart(userId)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.exist

                        expect(error).to.be.an.instanceof(UnexistenceError)
                        expect(error.message).to.equal(`cart does not exist`)
                    })
            })
    })

    it('should return an error when the user does not exist', () => {
        const randomId = ObjectId().toString()

        return retrieveCart(randomId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(UnexistenceError)
                expect(error.message).to.equal(`user with id ${randomId} does not exist`)
            })
    })

    it('should return a type error', () => {
        userId = undefined
        expect(() => {
            retrieveCart(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = 123
        expect(() => {
            retrieveCart(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = true
        expect(() => {
            retrieveCart(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

    })

    it('should return an error', () => {
        userId = ''
        expect(() => {
            retrieveCart(userId)
        }).to.throw(Error, `${userId} is empty or blank`)

        userId = '    '
        expect(() => {
            retrieveCart(userId)
        }).to.throw(Error, `${userId} is empty or blank`)
    })

    afterEach(() => Promise.all([users.deleteMany(), products.deleteMany()]))

    after(() => mongo.disconnect)

})




