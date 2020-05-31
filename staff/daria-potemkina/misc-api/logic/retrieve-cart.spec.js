require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveCart = require('./retrieve-cart')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('../data')

describe('logic - retrieveCart', () => {
    let carts, users

    before(() =>
        mongo.connect(MONGODB_URL_TEST)
            .then(connection => {
                carts = connection.db().collection('carts')
                users = connection.db().collection('users')
            })
    )

    let name, surname, email, password, userId, products

    beforeEach(() => {
        return carts.deleteMany()
            .then(() => users.deleteMany())
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`


                return users.insertOne({ name, surname, email, password })
                    .then(result => userId = result.insertedId.toString())

            })
    })

    describe('when the cart already exist', () => {
        beforeEach(() => {
            products = [`product-${random()}`, `product-${random()}`]

            return carts.insertOne({ user: userId, products })

        })
        it('should return the user cart with products', () => {
            retrieveCart(userId)
                .then(cart => {
                    expect(cart.user).to.be.undefined
                    expect(cart.products).to.be.an('array')
                    expect(cart.products).to.have.lengthOf(2)
                    expect(cart.products[0]).to.equal(products[0])
                    expect(cart.products[1]).to.equal(products[1])
                })
        })

    })

    it('should return an error when the cart does not exist', () => {
        retrieveCart(userId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`cart does not exist`)
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

    afterEach(() => {
        return users.deleteMany()
            .then(() => carts.deleteMany())
    })

    after(() => {
        users.deleteMany()
            .then(() => carts.deleteMany().then(mongo.disconnect))
    })
})




