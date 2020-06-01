require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const retrieveCart = require('./retrieve-cart')
const { expect } = require('chai')
const { mongo } = require('../data')
const { random } = Math


describe('logic - retrieve cart', () => {
    let users, cart, name, surname, email, password, pName, pPrice, pColor, pDescripition
    before(() => mongo.connect(MONGODB_URL).then(connection => {
        users = connection.db().collection('users')
        cart = connection.db().collection('carts')
    }))

    beforeEach(() => {

       return users.deleteMany()
            .then(() => {

                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`

                pName = `name-${random()}`
                pPrice = `"${random()}"`
                pColor = `color${random()}`
                pDescripition = `Description-${random()}`
debugger
                return users.insertOne({ name, surname, email, password })
                    .then(result => {
                        userId = result.insertedId.toString()
                        return cart.insertOne({userId,  pName, pPrice, pColor, pDescripition})
                    })
                })

            // .then(() => users.findOne({ email }))
            // .then(user => {
            //     if (user.email === email && user.password === password)
            //         return user._id.toString()
            // })
            // .then(userId => {
            //     cart.insertOne({
            //         userId, pName, pPrice, pColor, pDescripition
            //     })
            // })
            })

    it('should succed on retrieve products cart', () => {
        retrieveCart()
    })
})