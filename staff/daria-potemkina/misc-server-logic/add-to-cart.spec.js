require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const addToCart = require('./add-to-cart')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('misc-data')

describe('logic - addToCart', () => {
    let carts, users

    before(() =>
        mongo.connect(MONGODB_URL_TEST)
            .then(connection => {
                carts = connection.db().collection('carts')
                users = connection.db().collection('users')
            })
    )

    let name, surname, email, password, userId, _userId, productId, _productId

    beforeEach(() => {
        return carts.deleteMany()
            .then(() => {
                productId = `product - ${random()}`
                return users.deleteMany()
            })
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })
    })

    describe('when user already exist and no items in the cart', () => {
        beforeEach(() => {
            const user = { name, surname, email, password }

            return users.insertOne(user)
                .then(result => userId = result.insertedId.toString())
        })

        it('should add the first product to the cart', () => {
            return addToCart(userId, productId)
                .then(() => carts.find().toArray())
                .then(carts => {
                    expect(carts).to.have.lengthOf(1)

                    const [cart] = carts

                    expect(cart.user).to.equal(userId)
                    expect(cart.products).to.be.an('array')
                    expect(cart.products).to.have.lengthOf(1)

                })
        })

    })

    describe('when user already exist and there are already items in the cart', () => {
        beforeEach(() => {
            const user = { name, surname, email, password }
            _productId = `product - ${random()}`

            return users.insertOne(user)
                .then(result => {
                    userId = result.insertedId.toString()
                    return carts.insertOne({ user: userId, products: [_productId] })
                })

        })

        it('should add the product to the cart when one already exist', () => {
            return addToCart(userId, productId)
                .then(() => carts.find().toArray())
                .then(results => {
                    expect(results).to.have.lengthOf(1)

                    const [cart] = results

                    expect(cart.user).to.equal(userId)
                    expect(cart.products).to.be.an('array')
                    expect(cart.products).to.have.lengthOf(2)
                    expect(cart.products[0]).to.equal(_productId)
                    expect(cart.products[1]).to.equal(productId)

                })
        })
    })

    it('shoud return an error when user does not exist', () => {
        userId = '123455678990'
        return addToCart(userId, productId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            })
    })

    it('should return a type error', () => {
        _userId = undefined
        expect(() => {
            addToCart(_userId, productId)
        }).to.throw(TypeError, `${_userId} is not a string`)

        _userId = 123
        expect(() => {
            addToCart(_userId, productId)
        }).to.throw(TypeError, `${_userId} is not a string`)

        _userId = true
        expect(() => {
            addToCart(_userId, productId)
        }).to.throw(TypeError, `${_userId} is not a string`)

        _productId = undefined
        expect(() => {
            addToCart(userId, _productId)
        }).to.throw(TypeError, `${_productId} is not a string`)

        _productId = 123
        expect(() => {
            addToCart(userId, _productId)
        }).to.throw(TypeError, `${_productId} is not a string`)

        _productId = true
        expect(() => {
            addToCart(userId, _productId)
        }).to.throw(TypeError, `${_productId} is not a string`)
    })

    it('should return an error', () => {
        _userId = ''
        expect(() => {
            addToCart(_userId, productId)
        }).to.throw(Error, `${_userId} is empty or blank`)

        _userId = '    '
        expect(() => {
            addToCart(_userId, productId)
        }).to.throw(Error, `${_userId} is empty or blank`)

        _productId = ''
        expect(() => {
            addToCart(userId, _productId)
        }).to.throw(Error, `${_productId} is empty or blank`)

        _productId = '    '
        expect(() => {
            addToCart(userId, _productId)
        }).to.throw(Error, `${_productId} is empty or blank`)
    })

    afterEach(() => users.deleteMany({}))

    after(() => users.deleteMany({}).then(mongo.disconnect))

})

