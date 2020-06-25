require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const removeProductFromDelivery= require("./remove-product-from-delivery")
const {random}= Math
const { expect } = require('chai')
const {mongoose, models:{Client,Delivery,Product}}= require("facturator-data")
require('facturator-commons/ponyfills/xhr')
const context = require('./context')

context.API_URL = API_URL

describe("removeProductFromDelivery",()=>{
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
    it("should remove an entry with product and quantity from a delivery",()=>{
        return removeProductFromDelivery(deliveryId,productQuantityId)
            .then(result=>{
                expect(result).to.be.undefined
                return Delivery.find()
            })
            .then(deliveries=>{
                expect(deliveries).to.exist
                expect(deliveries.length).to.equal(1)
                const [delivery]= deliveries
                expect(delivery.client.toString()).to.equal(clientId)
                expect(delivery.products).to.be.instanceOf(Array)
                expect(delivery.products.length).to.equal(0)
            })
    })
    it("should return an error when given a delivery that does not exist",()=>{
        const id= mongoose.ObjectId().toString()
        return removeProductFromDelivery(id,productQuantityId)
            .catch(error=>{
                expect(error).to.exist
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`delivery with id ${id} does not exist`)
            })
    })
    it("should return an error when given a entry in the delivery that does not exist",()=>{
        const id= mongoose.ObjectId().toString()
        return removeProductFromDelivery(deliveryId,id)
            .catch(error=>{
                expect(error).to.exist
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`entry with id ${id} does not exist`)
            })
    })
    it("should throw an error when not given the delivery or entry ids",()=>{
        expect(()=>{removeProductFromDelivery()}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{removeProductFromDelivery(deliveryId)}).to.throw(TypeError,"undefined is not a string")
    })
    it("should throw an error when the ids are not strings",()=>{
        expect(()=>{removeProductFromDelivery(undefined,productQuantityId)}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{removeProductFromDelivery(123,productQuantityId)}).to.throw(TypeError,"123 is not a string")
        expect(()=>{removeProductFromDelivery(false,productQuantityId)}).to.throw(TypeError,"false is not a string")
        expect(()=>{removeProductFromDelivery([],productQuantityId)}).to.throw(TypeError," is not a string")
        expect(()=>{removeProductFromDelivery(deliveryId,undefined)}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{removeProductFromDelivery(deliveryId,123)}).to.throw(TypeError,"123 is not a string")
        expect(()=>{removeProductFromDelivery(deliveryId,false)}).to.throw(TypeError,"false is not a string")
        expect(()=>{removeProductFromDelivery(deliveryId,[])}).to.throw(TypeError," is not a string")
    })
    afterEach(async()=>{
        await Client.deleteMany()
        await Delivery.deleteMany()
        await Product.deleteMany()
    })
    after(mongoose.disconnect)
})