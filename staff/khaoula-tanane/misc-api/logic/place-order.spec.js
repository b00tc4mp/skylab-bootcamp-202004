require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const placeOrder = require('./place-order')
const { random } = Math
const { expect } = require('chai')
require('../utils/polyfills/json')
const { mongo } = require('../data')
const {ObjectId} = mongo 


describe('logic - place order', () => {
    debugger
    before( mongo.connect(MONGODB_URL).then(connection => {
        users = connection.db().collection('users')
        products = connection.db().collection('products')
        
    }))

    let name,surname,email,password, nameProduct, color, price, url;
    
    beforeEach(() => {
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
                    color: `color-${random()}`,
                    price: random() ,
                    url: `url-${random()}`
                }
                return Promise.resolve([products.insertOne(product).then(({ insertedId }) => productId = insertedId.toString())
                ])
                .then(() => {
                    const { cart = [] } = user
                    cart.push(product)
            
                return Promise.resolve(user).then(({ insertedId }) => userId = insertedId.toString())
                
                })
            
        })
                   
          
    })
 
        
    it('should succed on place order', () => {
        placeOrder(userId)
            .then(result => {
                expect(result).to.exist
                expect(result).to.be.an(Object)
                expect(result.nModified).to.equal(1)
                
                users.findOne({userId})
                    .then(user => {
                        expect(user.order).to.exist
                        expect(user.order.length).to.be.greaterThan(0)
                        expect(user.cart.length).to.equal(0)
                        
                    })
            })
    

    })
        
    

    after(() => users.deleteMany({}).then(mongo.disconnect))

})