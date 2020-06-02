require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const placeOrder = require('./place-order')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('../data')
const { ObjectId } = mongo
const { UnexistenceError } = require('../errors')

describe('logic - place order', () => {
    let users, products

    before(() => mongo.connect(MONGODB_URL_TEST).then(connection => {
        users = connection.db().collection('users')
        products = connection.db().collection('products')
        orders = connection.db().collection('orders')
    }))

    let user, product, userId, productId

    beforeEach(() =>
        Promise.all([users.deleteMany(), products.deleteMany(), orders.deleteMany()])
            .then(() => {
                user = {
                    name: `name-${random()}`,
                    surname: `surname-${random()}`,
                    email: `e-${random()}@mail.com`,
                    password: `password-${random()}`
                }

                product = {
                    _name: `car-${random()}`,
                    description: `description-${random()}`,
                    price: random() * 1000
                }

                return products.insertOne(product)
                    .then(_product => {
                        productId = _product.insertedId.toString()
                        user.cart = [{ product: productId, quantity: 2 }]

                        return users.insertOne(user).then(_user => userId = _user.insertedId.toString())
                    })
            })
    )

    it('should add order in order collection', () => {
        return placeOrder(userId)
            .then(() => users.find().toArray())
            .then(result => {
                expect(result).to.have.lengthOf(1)

                const [user] = result
                const { cart } = user

                expect(cart).to.have.lengthOf(0)

                return orders.find().toArray()
                    .then(_orders => {
                        expect(_orders).to.have.lengthOf(1)

                        const [order] = _orders

                        const { user, price, cart, date } = order

                        expect(user).to.equal(userId)
                        expect(price).to.equal(product.price * 2)
                        expect(cart).to.be.an('array')
                        expect(cart).to.have.lengthOf(1)
                        expect(cart[0].quantity).to.equal(2)
                        expect(cart[0].product).to.equal(productId)
                    })
            })
    })

    it('should return an errro when userId doesnt exist', () => {
        const randomId = ObjectId().toString()

        return placeOrder(randomId)
            .then(() => { throw new Error('it should not arrive to this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(UnexistenceError)

                expect(error.message).to.equal(`user with id ${randomId} does not exist`)
            })
    })

    it('should return an error when cart doesnt exist', () => {
        return users.updateOne({ _id: ObjectId(userId) }, { $set: { cart: [] } })
            .then(() => {
                return placeOrder(userId)
                    .then(() => { throw new Error('it should not arrive to this point') })
                    .catch(error => {
                        expect(error).to.exist
                        expect(error).instanceOf(UnexistenceError)
                        expect(error.message).to.equal('cart is empty')

                    })
            })
    })

    it('should return an erro when product doesnt exist', () => {
        return products.deleteMany()
            .then(() => {
                return placeOrder(userId)
                    .then(() => { throw new Error('it should not arrive to this point') })
                    .catch(error => {
                        expect(error).to.exist
                        expect(error).instanceOf(UnexistenceError)
                        expect(error.message).to.equal(`product with id ${productId} does not exist`)
                    })
            })
    })

    it('should return a type error', () => {
        userId = undefined
            expect(() => {
                placeOrder(userId)
            }).to.throw(TypeError, `${userId} is not a string`)
    
            userId = 123
            expect(() => {
                placeOrder(userId)
            }).to.throw(TypeError, `${userId} is not a string`)
    
            userId = true
            expect(() => {
                placeOrder(userId)
            }).to.throw(TypeError, `${userId} is not a string`)
        })
    
        it('should return an error', () => {
            userId = ''
            expect(() => {
                placeOrder(userId)
            }).to.throw(Error, `${userId} is empty or blank`)
    
            userId = '    '
            expect(() => {
                placeOrder(userId)
            }).to.throw(Error, `${userId} is empty or blank`)
        })


    afterEach(() => Promise.all([users.deleteMany(), products.deleteMany(), orders.deleteMany()]))

    after(() => mongo.disconnect())
})