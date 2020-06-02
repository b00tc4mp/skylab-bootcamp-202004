require("dotenv").config()
const{env:{TEST_MONGODB_URL: MONGODB_URL}}= process

const updateCart=require("./update-cart")
const { random } = Math
const { expect } = require('chai')
require('../misc-commons/polyfills/json')
const { mongo } = require('../misc-data')
const { ObjectId } = mongo
const { UnexistenceError } = require('../misc-commons/errors')

describe("logic - update-cart", () => {
    let users, products
    let userId,productId
    const fakeId = ObjectId("3ed394d4cc9f7a4088b32e0c").toString()
    before( () => {
        return mongo.connect(MONGODB_URL)
            .then(connection => {
                const db = connection.db()
                users = db.collection("users")
                products = db.collection('products')
            })
    })
    beforeEach(()=>{
        debugger
        return Promise.all([
            users.deleteMany(),
            products.deleteMany()
        ])
            .then(()=>{
                const user={}
                user.name=`name-${random()}`
                user.surname=`surname-${random()}`
                user.email=`e-${random()}@mail.com`
                user.password=`password-${random()}`

                const product = {
                name : `name-${random()}`,
                description: `description-${random()}`,
                price: random() * 20
                }
                return Promise.all([
                    users.insertOne(user)
                        .then(({insertedId})=> userId=insertedId.toString())
                    
                    ,products.insertOne(product)
                        .then(({insertedId})=> productId=insertedId.toString())
                    ])
            })
    })
    it("should succeed in changing the user's cart",()=>{
        return updateCart(userId,productId,3)
            .then(result=>{
                expect(result).to.be.undefined
                return users.findOne({_id:ObjectId(userId)})
            })
            .then(user=>{
                expect(user).to.exist
                const {cart}= user
                expect(cart).to.exist
                expect(cart.length).to.equal(1)

                expect(cart[0]).to.exist
                expect(cart[0].product.toString()).to.equal(productId)
                expect(cart[0].quantity).to.equal(3)
            })
    })
    it("hould fail when trying to remove a whole product that is not in the user's cart",()=>{
        updateCart(userId,productId,0)
            .then(()=>{throw new Error("should not reach this ponit")})
            .catch(error=>{
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`product with id ${productId} not found in the cart of user ${userId}`)
            })
    })
    it("should fail when the user does not exist",()=>{
        
        return updateCart(fakeId, productId, 10)
            .then(()=>{throw new Error("should not reach this ponit")})
            .catch(error=>{
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with _id ${fakeId} not found`)
            })
    })
    it("should fail when the product does not exist",()=>{
        return updateCart (userId, fakeId, 3)
            .then(()=>{ throw new Error('should not reach this point')})
            .catch ( error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.be.equal(`product with _id ${fakeId} not found`)
            })
            
    })

    it('should throw error when the userId is not a string', () => {
        try{
            return updateCart(undefined, productId, 3)
                .then(()=>{throw new Error()})
        }catch(error){
            expect(error).to.exist
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal(undefined+" is not a string")
        }
    })
    it('should throw error when the productId is not a string', () => {
        try{
            return updateCart(userId, undefined, 3)
                .then(()=>{throw new Error()})
        }catch(error){
            expect(error).to.exist
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal(undefined+" is not a string")
        }
    })
    it('should throw error when the quantity is not a number', () => {
        try{
            return updateCart(userId, productId, undefined)
                .then(()=>{throw new Error()})
        }catch(error){
            expect(error).to.exist
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal(undefined+" is not a number")
        }
    })
    afterEach(()=>{
        return Promise.all([users.deleteMany(),products.deleteMany()])
    })
    after(()=>{return mongo.disconnect()})
})
