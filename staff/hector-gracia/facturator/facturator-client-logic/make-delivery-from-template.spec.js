require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const makeDeliveryFromTemplate= require("./make-delivery-from-template")
const {random}= Math
const { expect } = require('chai')
const { mongoose, models: { Client,Product,Template,Delivery } } = require('facturator-data')
require('facturator-commons/ponyfills/xhr')
const context = require('./context')

describe("makeDeliveryFromTemplate",()=>{
    before(()=>{mongoose.connect(MONGODB_URL)})
    //Client
    let clientName, clientEstablishment, clientContactNumber, clientEmail, clientDirection, clientPaymentMethod, clientPaymentInfo, clientId
    //Product
    let productName, productDescription, productPrice,productTax, productAlergens, productId
    //Template
    let templateId, templateName, templateProducts, templateQuantity
    beforeEach(async()=>{
        await Client.deleteMany()
        await Product.deleteMany()
        await Template.deleteMany()
        await Delivery.deleteMany()
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
        //Template
        templateName=`templateName-${random()}`
        templateQuantity= Math.floor(random()*10)
        templateProducts=[]
        templateProducts.push({product:product._id,quantity:templateQuantity})
        const template= await Template.create({name:templateName,products: templateProducts})
        templateId= template._id.toString()
    })
    it("should create a new delivery for a client getting the products and quantity from a template",()=>{
        return makeDeliveryFromTemplate(clientId,templateId)
            .then(results=>{
                expect(results).to.be.undefined
                return Delivery.find()
            })
            .then(deliveries=>{
                expect(deliveries).to.exist
                expect(deliveries.length).to.equal(1)
                const[delivery]= deliveries
                expect(delivery.client.toString()).to.equal(clientId)
                expect(delivery.paid).to.equal(false)
                expect(delivery.amount).to.equal(0)//TODO make it so it calculates the amount
                expect(delivery.products).to.exist
                expect(delivery.products).to.be.instanceOf(Array)
                expect(delivery.products.length).to.equal(templateProducts.length)
                for(let i=0;i<templateProducts.length;i++){
                    expect(delivery.products[i].product.toString()).to.equal(templateProducts[i].product.toString())
                    expect(delivery.products[i].quantity).to.equal(templateProducts[i].quantity)
                }
            })
    })
    it("should throw an error when given a client that does not exist",()=>{
        const id= mongoose.ObjectId().toString()
        return makeDeliveryFromTemplate(id,templateId)
            .catch(error=>{
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`client with id ${id} does not exist`)
            })
    })
    it("should throw an error when given a template that does not exist",()=>{
        const id= mongoose.ObjectId().toString()
        return makeDeliveryFromTemplate(clientId,id)
            .catch(error=>{
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`template with id ${id} does not exist`)
            })
    })
    it("should throw an error when not given the ids as strings",()=>{
        expect(()=>{makeDeliveryFromTemplate()}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{makeDeliveryFromTemplate(123)}).to.throw(TypeError,"123 is not a string")
        expect(()=>{makeDeliveryFromTemplate(clientId)}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{makeDeliveryFromTemplate(clientId,123)}).to.throw(TypeError,"123 is not a string")
    })

    afterEach(async()=>{
        await Client.deleteMany()
        await Product.deleteMany()
        await Template.deleteMany()
        await Delivery.deleteMany()
    })
    after(mongoose.disconnect)
})