require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const addToCart = require('./add-to-cart')
const { random } = Math
const { expect } = require('chai')
require('../utils/polyfills/json')
const { mongo } = require('../data')

describe('logic - add to cart', () => {
    let users
    let products
    let carts

    before(() =>
        mongo.connect(MONGODB_URL)
            .then(connection => {
                users = connection.db().collection('users')
                products = connection.db().collection('products')
                carts = connection.db().collection('carts')
            })
    )

    let name, surname, email, password
    let product
    let cart

    beforeEach(() => // TODO this
        users.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                return
            }),

        carts.deleteMany()
            .then(() => {
                return
            }),
        products.deleteMany()
            .then(() => {
                productName = `name-${random()}`
                description = `description-${random()}`
                price = random() + 1
                url = 'http://thisisimg.jpg'
                return
            }),



    )

    describe('when product exists', () => {
        beforeEach(() => { // TODO this
            const user = { name, surname, email, password }

            return users.insertOne(user)
        })

        it('should succeed on valid product input', () =>
            addToCart(name, surname, email, password)
                .then(() => users.find().toArray())
                .then(users => {
                    expect(users.length).to.equal(1)

                    const [user] = users

                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
        )

        it('should fail on trying to register an existing user', () =>
            registerUser(name, surname, email, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist

                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with e-mail ${email} already exists`)
                })
        )
    })

    afterEach(() => users.deleteMany())

    after(() => users.deleteMany({}).then(mongo.disconnect))
})