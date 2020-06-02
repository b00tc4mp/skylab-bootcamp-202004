require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const updateCart = require('./update-cart')
const { random, floor } = Math
const { expect } = require('chai')
const { mongo } = require('../data')
const { ObjectId } = mongo
const { UnexistenceError } = require('../errors')

describe('logic - update cart', () => {
    let users, products

    before(() => mongo.connect(MONGODB_URL_TEST).then(connection => {
        users = connection.db().collection('users')
        products = connection.db().collection('products')
    }))

    let user, product, userId, productId, quantity

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

                return Promise.all([
                    users.insertOne(user).then(_user => userId = _user.insertedId.toString()),
                    products.insertOne(product).then(_product => productId = _product.insertedId.toString())
                ])
            })
    }
    )


    it('should add the product', () => {
        quantity = floor(random() * 10)
        return updateCart(userId, productId, quantity)
            .then(() => {
                return users.find().toArray()
            })
            .then(_users => {
                expect(_users).to.have.lengthOf(1)

                const [user] = _users

                expect(user._id.toString()).to.equal(userId)

                const { cart } = user

                expect(cart).to.be.an('array')
                expect(cart[0].product.toString()).to.equal(productId)
                expect(cart[0].quantity).to.equal(quantity)
                expect(cart).to.have.lengthOf(1)
            })
    })

    it('should delete the product from the cart if quantity is 0', () => {
        return users.updateOne({ _id: ObjectId(userId) }, { $set: { cart: [{ product: ObjectId(productId), quantity: 1 }] } })
            .then(() => {
                return updateCart(userId, productId, 0)
            })
            .then(() => {
                return users.find().toArray()
            })
            .then(_users => {
                expect(_users).to.have.lengthOf(1)

                const [user] = _users

                expect(user._id.toString()).to.equal(userId)

                const { cart } = user

                expect(cart).to.be.an('array')
                expect(cart[0]).to.be.undefined
                expect(cart).to.have.lengthOf(0)
            })
    })

    it('should fail if the ids do not exist', () => {
        const randomId = ObjectId().toString()
        
        return updateCart(randomId, productId, 5)
            .then(() => { throw new Error('it should not arrive to this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id ${randomId} does not exist`)
            })
    })

    it('should fails if the product does not exist', () => {
        const _productId = ObjectId().toString()

        return updateCart(userId, _productId, 5)
            .then(() => { throw new Error('it should not arrive to this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`product with id ${_productId} does not exist`)
            })
    })

    it('should fails if the product does not exist', () => {
        return updateCart(userId, productId, 0)
            .then(() => { throw new Error('it should not arrive to this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`product with id ${productId} does not exist in cart for user with id ${userId}`)
            })
    })

    afterEach(() => Promise.all([users.deleteMany(), products.deleteMany()]))

    after(() => mongo.disconnect())
})