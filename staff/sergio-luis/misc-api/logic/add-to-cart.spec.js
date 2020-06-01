require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process

const addToCart = require('./add-to-cart')
const { random } = Math
const { expect } = require('chai')
require('../utils/polyfills/json')
const { mongo } = require('../data')

describe.only('add-to-cart', () => {
    let users, products, carts

    before(() =>
        mongo.connect(MONGODB_URL)
            .then(connection => {
                users = connection.db().collection('users')
                // products = connection.db().collection('products')
                carts = connection.db().collection('carts')
            })
    )

    let name, surname, email, password, userId, productId

    beforeEach(() =>
        users.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`

                const user = { name, surname, email, password }
    
                return users.insertOne(user)   
            })
            .then(result => userId = result.insertedId.toString())
            .then(() =>{

            products = connection.db().collection('products')
                return products.insertOne({name:'jeans',price:'20'})
                    .then(result => {productId = result.insertedId.toString()})
            })
                     
    )

    it('should succeed on creat card', () => {
        addToCart(userId, productId)
            .then(result => {
                debugger
                expect(result).to.exist
                return carts.find({user:userId})
                    .then(cart =>{
                        expect(cart._id.toString()).to.equal(result)
                    })
            })
            .catch(error => expect(error).to.be.undefined)
            
    })
    

    // it('should succeed on creat card', () =>
    //     addToCart(userId, productId)
    //         .then(result => {
    //             return  expect(result).to.exist
    //                 .then(()=>{

    //                     return carts.find({user:userId})
    //                 })
    //                 .then(cart =>{
    //                     expect(cart._id.toString()).to.equal(result)
    //                 })
    //         })
    // )



    afterEach(() => {
        users.deleteMany()
        carts.deleteMany()
        products.deleteMany()

    })

    after(() => users.deleteMany().then(mongo.disconnect))
})