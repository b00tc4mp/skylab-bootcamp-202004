require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveClientDiscountList = require('./retrieve-client-discount-list')
const { random,round } = Math
const { expect } = require('chai')
const { mongoose, models: { Client,Product } } = require('facturator-data')
const {  errors: { UnexistenceError } } = require('facturator-commons')

describe('retrieveClientDiscountList', () => {
    before(() => mongoose.connect(MONGODB_URL))
    let clientName, clientEstablishment, clientContactNumber, clientEmail ,clientDirection,clientPaymentMethod,clientPaymentInfo,clientId
    let productName, productDescription, productPrice, productTax, productAlergens,productId,productDiscount
    let newDiscount={}

    beforeEach(async()=>{
        await Client.deleteMany()
        clientName = `name-${random()}`
        clientEstablishment = `establishment-${random()}`
        clientContactNumber= random()
        clientEmail = `e-${random()}@mail.com`
        clientDirection=`direction-${random()}`
        clientPaymentMethod=`paymentMethod-${random()}`
        clientPaymentInfo=`paymentInfo-${random()}`
        const client= await Client.create({name:clientName,establishment:clientEstablishment,contactNumber:clientContactNumber,email:clientEmail,direction:clientDirection,paymentInfo:clientPaymentInfo,paymentMethod:clientPaymentMethod})
        clientId= client._id.toString()
        await Product.deleteMany()
        productName = `name-${random()}`
        productDescription= `description-${random()}`
        productPrice= random()
        productTax= random()
        productAlergens=[]
        for(let i = 0; i < Math.floor(random()*4);i++){
            productAlergens.push(`alergen-${random()}`)
        }
        const product= await Product.create({name:productName,description:productDescription,price:productPrice,tax:productTax,alergens:productAlergens})
        productId=product._id.toString()
        productDiscount=Math.floor(random()*100)
        newDiscount.product= productId
        newDiscount.discount= productDiscount
        client.discounts.push(newDiscount)
        await client.save()
    })
    it("should return all discounts of an existing client",async()=>{
        const results =await retrieveClientDiscountList(clientId)
        expect(results).to.be.instanceOf(Array)
        expect(results.length).to.equal(1)
        const[result]= results
        expect(result.name).to.equal(productName)
        expect(result.description).to.equal(productDescription)
        expect(result.basePrice).to.equal(round(productPrice*100)/100)
        expect(result.discount).to.equal(newDiscount.discount)
        expect(result.finalPrice).to.equal(round((productPrice-productPrice*newDiscount.discount*0.01)*100)/100)
        expect(result.productId).to.equal(productId)
    })
    it("should throw an error when not given a clientId",()=>{
        expect(()=>{retrieveClientDiscountList()}).to.throw(TypeError,"undefined is not a string")
    })
    it("should throw an error when clientId is not a string",()=>{
        expect(()=>{retrieveClientDiscountList(123)}).to.throw(TypeError,"123 is not a string")
    })
    it("should return an error when given an id of a client that does not exist",async()=>{
        const id = mongoose.ObjectId().toString()
        let error
        try {
            await retrieveClientDiscountList(id)
        } catch (_error) {
            error=_error
        }
        expect(error).to.exist
        expect(error).to.be.instanceOf(UnexistenceError)
        expect(error.message).to.equal(`client with id ${id} does not exist`)
    })//TODO what if there is a discount for a product that does not exist??
    afterEach(async() => {
        await Product.deleteMany()
        await Client.deleteMany()
    })

    after(mongoose.disconnect)
})