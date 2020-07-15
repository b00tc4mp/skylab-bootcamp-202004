require('dotenv').config()

const { env: { TEST_MONGO_URL: MONGODB_URL } } = process

const { mongo } = require('misc-data')
const { ObjectId } = mongo
const { expect } = require('chai')
const { random } = Math
const placeOrder = require('./place-order')


describe.only('logic - place-order', () => {

    let users, products, userId, productId

    before(() => mongo.connect('mongodb://localhost:27017/misc-api-test').then(connection => {
        users = connection.db().collection('users')
        products = connection.db().collection('products')
    }))

    let name, surname, email, password

    beforeEach(() => {

        return users.deleteMany()
            .then(() => products.deleteMany())
            .then(() => {

                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`

                pName = `pName-${random()}`
                pPrice = 200
                color = `pColor-${random()}`
                description = `pDescription-${random()}`

                return Promise.all([
                    users.insertOne({ name, surname, email, password }),
                    products.insertOne({ pName, pPrice, color, description })
                ])
            })
            .then(([user, product]) => {
                userId = user.insertedId.toString()
                productId = product.insertedId.toString()

                users.updateOne({ _id: ObjectId(userId) }, { $set: { cart: [{ product: productId, quantity: 2 }] } })
            })
    })

    it('should succed on place order', () => {
        placeOrder(userId)
            .then(() => {
                users.findOne({ _id: ObjectId(userId) })
                    .then(({ cart, order }) => {
                        expect(cart.length).to.be.equal(0)
                        expect(order).to.exist
                    })
                    .catch({error})
            })
    })


    afterEach(() => {
        return Promise.all(
            [users.deleteMany(), products.deleteMany()])
    })
    after(() => mongo.disconnect())
})
