require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const placeOrder = require('./place-order')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { User, Product, Order } } = require('misc-data')
const {  ObjectId  } = mongoose
const { errors: { UnexistenceError } } = require('misc-commons')


false && describe('logic - place order', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let user, product, userId, productId

    beforeEach(() =>
        Promise.all([User.deleteMany(), Product.deleteMany(), Order.deleteMany()])
            .then(() => {
                user = {
                    name: `name-${random()}`,
                    surname: `surname-${random()}`,
                    email: `e-${random()}@mail.com`,
                    password: `password-${random()}`
                }

                product = {
                    name: `car-${random()}`,
                    description: `description-${random()}`,
                    price: random() * 1000,
                    url: `http://${random()}.com`
                }

                return Product.create(product)
                    .then(product => {
                        productId = product._id.toString()
                        user.cart = [{ product: productId, quantity: 2 }]

                        return User.create(user).then(_user => userId = _user._id.toString())
                    })
            })
    )

    it('should add order in order collection', () => {
        return placeOrder(userId)
            .then(() => User.find())
            .then(result => {
                expect(result).to.have.lengthOf(1)

                const [user] = result
                const { cart } = user

                expect(cart.length).to.equal(0)

                return Order.find()
                    .then(_orders => {
                        expect(_orders).to.have.lengthOf(0)

                        const [order] = _orders

                        const { user, totalPrice, products, date } = order

                        expect(user.toString()).to.equal(userId)
                        expect(totalPrice).to.equal(product.price * 2)
                        expect(products).to.be.an('array')
                        expect(products).to.have.lengthOf(1)
                        expect(products[0].quantity).to.equal(2)
                        expect(products[0].product.toString()).to.equal(productId)
                        expect(date).to.be.an.instanceOf(Date)
                    })
            })
    })

    it('should return an error when userId doesnt exist', () => {
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
        return User.updateOne({ _id: userId }, { $set: { cart: [] } })
            .then(() => {
                return placeOrder(userId)
                    .then(() => { throw new Error('it should not arrive to this point') })
                    .catch(error => {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(UnexistenceError)
                        expect(error.message).to.equal('cart is empty')

                    })
            })
    })

    // it('should return an error when product doesnt exist', () => {
    //     return Product.deleteMany()
    //         .then(() => {
    //             return placeOrder(userId)
    //                 .then(() => { throw new Error('it should not arrive to this point') })
    //                 .catch(error => {
    //                     expect(error).to.exist
    //                     expect(error).to.be.an.instanceOf(UnexistenceError)
    //                     expect(error.message).to.equal(`product does not exist`)
    //                 })
    //         })
    // })

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


    afterEach(() => Promise.all([User.deleteMany(), Product.deleteMany(), Order.deleteMany()]))

    after(mongoose.disconnect)
})