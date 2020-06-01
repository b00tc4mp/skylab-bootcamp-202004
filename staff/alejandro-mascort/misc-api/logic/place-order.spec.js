require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const placeOrder = require('./place-order')
const { random, floor } = Math
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
                        user.cart = [{product: _product.insertedId, quantity: 2}]

                        return users.insertOne(user).then(_user => userId=_user.insertedId.toString())
                    })
                
            })
    )

    it('should add order in order collection and delete user cart', () => {
        return placeOrder(userId)
            .then(() => users.find().toArray())
            .then(result => {
                expect(result).to.have.lengthOf(1)

                const [user] = result
                const {cart} = user

                expect(cart).to.have.lengthOf(0)
                return orders.find().toArray()
                    .then(_orders => {
                        expect(_orders).to.have.lengthOf(1)
        
                        const [order] = _orders

                        const {user, price, cart, date} = order

                        expect(user).to.equal(userId)
                        expect(price).to.equal(product.price*2)
                        expect(cart).to.be.an('array')
                        expect(cart).to.have.lengthOf(1)
                        expect(cart[0].quantity).to.equal(2)
                        expect(cart[0].product.toString()).to.equal(productId)
                        expect(date).to.be.an.instanceOf(Date)
                }) 
            })
    })

    it('should fail when user does not exist', () =>
        placeOrder(userId = ObjectId().toString())
            .then(() => { throw new Error('it should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            })
    )

    it('should fail if user cart is empty', () =>
        users.insertOne({
            name: `name-${random()}`,
            surname: `surname-${random()}`,
            email: `e-${random()}@mail.com`,
            password: `password-${random()}`
        })
        .then(_user => 
            placeOrder(_user.insertedId.toString())
                .then(() => { throw new Error('it should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
    
                    expect(error).to.be.instanceOf(UnexistenceError)
                    expect(error.message).to.equal(`cart is empty`)
                })
        )
    )

    it('should fail when userId is not an string', () =>
        expect(() => {
            placeOrder(true)
        }).to.throw(TypeError, 'true is not a string')   
    )

    afterEach(() =>
        Promise.all([
            users.deleteMany(),
            products.deleteMany(), 
            orders.deleteMany()
        ])
    )

    after(() => mongo.disconnect())
})