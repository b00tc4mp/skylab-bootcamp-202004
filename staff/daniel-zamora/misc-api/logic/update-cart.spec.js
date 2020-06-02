require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongo } = require('../data')

const updateCart = require('./update-cart')
const { random } = Math
const { expect } = require('chai')
const { UnexistenceError } = require('../errors')

describe.only('logic - update cart', () => {
    let users, products

    before(() => 
        mongo.connect(MONGODB_URL).then(connection=> {
            users = connection.db().collection('users')
            products = connection.db().collection('products')
        })
    )
        
    let userId, productId, quantity

    beforeEach(()=> 
        Promise.all([
            users.deleteMany(), products.deleteMany() ])
    
            .then(()=>{
                const user = {
                name: `name-${random()}`,
                surname: `surname-${random()}`,
                email: `e-${random()}@mail.com`,
                password: `password-${random()}`
                }
                
                const product = {
                    name:`name-${random()}`,
                    price: random() * 100 
                }

                quantity = Math.floor(Math.random() * 100 )
                
                return Promise.all([
                    users.insertOne(user).then(({insertedId}) => userId = insertedId.toString()),
                    products.insertOne(product).then(({ insertedId}) => productId = insertedId.toString())
                ])    
            })
    )

        it('should succeed on existing product and user', () => 
            updateCart(userId, productId, quantity) 
                .then(result=>{ 
                    expect(result).to.be.undefined
                    return users.findOne({_id: mongo.ObjectId(userId)})
                })
                .then(user => {
                    expect(user).to.exist

                    const { cart } = user 
                    const [ product ] = cart

                    expect(cart).to.exist
                    expect(product).to.equal(productId)
                })
        )

    //     it('should fail on wrong password', () => 
    //         authenticateUser(email, "123")
    //             .then(()=>{throw new Error("Should not be here")})
    //             .catch(error=> { 
    //                 expect(error).to.be.an.instanceOf(CredentialsError)
                    
    //                 expect(error.message).to.equal(`wrong password`)
    //             })
    //     )

    //     it('should fail when incorrect inputs are introduced', () => {
    //         try{
    //             authenticateUser( 1, password)          
    //         }catch(error){
    //             expect(error).to.be.an.instanceof(TypeError)
    //             expect(error.message).to.equal(`1 is not a string`)
    //         }
    
    //         try{
    //             authenticateUser( '', password)          
    //         }catch(error){
    //             expect(error).to.be.an.instanceof(Error)
    //             expect(error.message).to.equal(` is empty or blank`)
    //         }
    
    //         try{
    //             authenticateUser(email, 1)          
    //         }catch(error){
    //             expect(error).to.be.an.instanceof(TypeError)
    //             expect(error.message).to.equal(`1 is not a string`)
    //         }
    
    //         try{
    //             authenticateUser(email, '')          
    //         }catch(error){
    //             expect(error).to.be.an.instanceof(Error)
    //             expect(error.message).to.equal(` is empty or blank`)
    //         }
    //     })
    // })
    
    // describe('when user does not exist', ()=>{
    //     it('should fail when user does not exist', () => 
    //         authenticateUser(email, password)
    //             .then(()=>{throw new Error("Should throw error")})
    //             .catch(error=>{
    //                 expect(error).to.be.an.instanceof(UnexistenceError)

    //                 expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
    //             })
    //     )
    // })
        
    afterEach(() => 
        Promise.all([ 
            users.deleteMany(), 
            products.deleteMany()
        ])
    )
    after(() => mongo.disconnect())
    })