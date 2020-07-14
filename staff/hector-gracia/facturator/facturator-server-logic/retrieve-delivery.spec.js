require("dotenv").config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const retrieveDelivery = require('./retrieve-delivery')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { Client,Delivery,Product } } = require('facturator-data')
const {errors:{UnexistenceError}}= require("facturator-commons")

describe("retrieveDelivery",()=>{
    before(()=>{mongoose.connect(MONGODB_URL)})
    //Client
    let clientName, clientEstablishment, clientContactNumber, clientEmail, clientDirection, clientPaymentMethod, clientPaymentInfo, clientId
    //Product
    let productName, productDescription, productPrice,productTax, productAlergens, productId
    let productQuantity,productQuantityId
    //Delivery
    let deliveryId

    beforeEach(async()=>{
        await Client.deleteMany()
        await Delivery.deleteMany()
        await Product.deleteMany()
        //Client
        clientName = `clientName-${random()}`
        clientEstablishment = `establishment-${random()}`
        clientContactNumber= random()
        clientEmail = `e-${random()}@mail.com`
        clientDirection=`direction-${random()}`
        clientPaymentMethod=`paymentMethod-${random()}`
        clientPaymentInfo=`paymentInfo-${random()}`
        const client= await Client.create({name:clientName, establishment:clientEstablishment,contactNumber: clientContactNumber,email:clientEmail,direction:clientDirection,paymentMethod:clientPaymentMethod,paymentInfo:clientPaymentInfo})
        clientId= client._id.toString()
        //Product
        productName = `productName-${random()}`
        productDescription= `description-${random()}`
        productPrice= random()
        productTax= random()
        productAlergens=[]
        for(let i = 0; i < Math.floor(random()*4);i++){
            productAlergens.push(`alergen-${random()}`)
        }
        const product= await Product.create({name:productName,description:productDescription,price:productPrice,tax:productTax,alergens:productAlergens})
        productId= product._id.toString()
        productQuantity={}
        productQuantity.product=productId
        productQuantity.quantity= Math.floor(random()*10)
        //Delivery
        const delivery= await Delivery.create({client:client._id,products:productQuantity,amount:0,paid:false})
        deliveryId= delivery._id.toString()
        productQuantityId=delivery.products[0]._id.toString()
    })
    it("should return a sanitized delivery in a comprehensible manner",async()=>{
        const result= await retrieveDelivery(deliveryId)
        expect(result).to.not.be.undefined
        //client
        expect(result.client.name).to.equal(clientName)
        expect(result.client.id).to.equal(clientId)
        expect(result.client.establishment).to.equal(clientEstablishment)
        expect(result.client.contactNumber).to.equal(clientContactNumber)
        expect(result.client.email).to.equal(clientEmail)
        expect(result.client.direction).to.equal(clientDirection)
        expect(result.client.paymentMethod).to.equal(clientPaymentMethod)
        expect(result.client.paymentInfo).to.equal(clientPaymentInfo)
        expect(result.client.__v).to.be.undefined 
        expect(result.client._id).to.be.undefined 
        //products
        expect(result.products.length).to.equal(1)
        expect(result.products[0].quantity).to.equal(productQuantity.quantity)
        expect(result.products[0].id).to.equal(productQuantityId)
        expect(result.products[0].product.id).to.equal(productId)
        expect(result.products[0].product.name).to.equal(productName)
        expect(result.products[0]._id).to.be.undefined
        expect(result.products[0].product._id).to.be.undefined
        expect(result.products[0].product.__v).to.be.undefined
    })
    it("should return an error when given a delivery that does not exist",async()=>{
        const id=mongoose.ObjectId().toString()
        let error
        try {
            await retrieveDelivery(id)
        } catch (_error) {
            error=_error
        }
        expect(error).to.exist
        expect(error).to.be.instanceOf(UnexistenceError)
        expect(error.message).to.equal(`delivery with id ${id} does not exist`)
    })
    it("should throw an error when the id is not a string",()=>{
        expect(()=>{retrieveDelivery(undefined)}).to.throw(`${undefined} is not a string`)
        expect(()=>{retrieveDelivery(123)}).to.throw(`${123} is not a string`)
        expect(()=>{retrieveDelivery(false)}).to.throw(`${false} is not a string`)
        expect(()=>{retrieveDelivery([])}).to.throw(`${[]} is not a string`)
        expect(()=>{retrieveDelivery({})}).to.throw(`${{}} is not a string`)
        expect(()=>{retrieveDelivery(()=>{})}).to.throw(`${()=>{}} is not a string`)
    })

    afterEach(async()=>{
        await Client.deleteMany()
        await Delivery.deleteMany()
        await Product.deleteMany()
    })
    after(mongoose.disconnect)
})