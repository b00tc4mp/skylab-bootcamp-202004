require('dotenv').config()

const { MONGODB_URL_TEST: MONGODB_URL  } = process.env
debugger
const updateCart = require('./update-cart')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('misc-data')
const { ObjectId } = mongo

describe('logic - update cart', () => {
    let users, products

    before(() =>
        mongo.connect(MONGODB_URL).then(connection => {
            const db = connection.db()

            users = db.collection('users')

            products = db.collection('products')
        })
    )

    let userId, productId

    beforeEach(() =>
        Promise.all([
            users.deleteMany(),
            products.deleteMany()
        ])
            .then(() => {
                const user = {
                    name: `name-${random()}`,
                    surname: `surname-${random()}`,
                    email: `e-${random()}@mail.com`,
                    password: `password-${random()}`
                }

                const product = {
                    name: `name-${random()}`,
                    description: `description-${random()}`,
                    price: random() * 1000
                }

                return Promise.all([
                    users.insertOne(user).then(({ insertedId }) => userId = insertedId.toString()),
                    products.insertOne(product).then(({ insertedId }) => productId = insertedId.toString())
                ])
            })
    )

    it('should succeed on existing user and product', () =>
        updateCart(userId, productId, 1)
            .then(result => {
                expect(result).to.be.undefined

                return users.findOne({ _id: ObjectId(userId) })
            })

            .then(user => {
                expect(user).to.exist

                const { cart } = user

                expect(cart).to.exist
                expect(cart).to.have.lengthOf(1)

                const [_product] = cart

                expect(_product).to.exist

                const { product, quantity } = _product

                expect(product.toString()).to.equal(productId)
                expect(quantity).to.equal(1)
            })
    )

    it('should succeed on eliminated a product', () =>
        updateCart(userId, productId, 1)
            .then(result => {
                expect(result).to.be.undefined 
                debugger
            })
            .then(()=>{
                updateCart(userId, productId, 0)
                
                return users.findOne({ _id: ObjectId(userId) })
            })
            .then(user => {
                expect(user).to.exist

                const { cart } = user
                expect(cart).to.exist
        

                const {product,quantity}  = cart

               expect(product).to.be.undefined
               expect(quantity).to.be.undefined
            })
    )
            
    afterEach(() =>
        Promise.all([
            users.deleteMany(),
            products.deleteMany()
        ])
    )

    after(() => mongo.disconnect())
})