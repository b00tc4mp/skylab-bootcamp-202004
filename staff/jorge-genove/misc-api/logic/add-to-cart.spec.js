require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const createProduct = require('./create-products')
const { random } = Math
const { expect } = require('chai')
require('../utils/polyfills/json')
const { mongo } = require('../data')

describe('logic-add to cart', () => {
    let name, product, price, url
    let _name, surname, email, password
    let userId, products
    

    Before(() => mongo.connect(MONGODB_URL)
        .then(connection => carts = connection.db().collection('carts')))

})

describe ('if user dont have an added cart', () =>{

    beforeEach(() => {

    })
})