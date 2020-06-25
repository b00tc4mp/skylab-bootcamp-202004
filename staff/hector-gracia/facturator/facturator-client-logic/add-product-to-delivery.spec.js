require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const addProductToDelivery= require("./add-product-to-delivery")
const {random}= Math
const { expect } = require('chai')
const { mongoose, models: { Client,Product,Delivery } } = require('facturator-data')
require('facturator-commons/ponyfills/xhr')
const context = require('./context')

describe("addProductToDelivery",()=>{
    before(()=>{mongoose.connect(MONGODB_URL)})
    //Client
    let clientName, clientEstablishment, clientContactNumber, clientEmail, clientDirection, clientPaymentMethod, clientPaymentInfo, clientId
    //Product
    let productName, productDescription, productPrice,productTax, productAlergens, productId
    let productQuantity
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
        productQuantity.productId=productId
        productQuantity.quantity= Math.floor(random()*10)
        //Delivery
        const delivery= await Delivery.create({client:client._id,products:[],amount:0,paid:false})
        deliveryId= delivery._id.toString()
    })
    it("should add a specified product with a specified quantity to a delivery",()=>{
        return addProductToDelivery(deliveryId,productQuantity)
            .then(result=>{
                expect(result).to.be.undefined
                return Delivery.find()
                    .then(deliveries=>{
                        expect(deliveries).to.exist
                        expect(deliveries.length).to.equal(1)
                        const [delivery]=deliveries
                        expect(delivery.client.toString()).to.equal(clientId)
                        expect(delivery.products).to.be.instanceOf(Array)
                        expect(delivery.products.length).to.equal(1)
                        expect(delivery.products[0].product.toString()).to.equal(productQuantity.productId)
                        expect(delivery.products[0].quantity).to.equal(productQuantity.quantity)
                    })
            })
            //Add another product
            .then(()=>{
                const quantity2= Math.floor(random()*10)
                return addProductToDelivery(deliveryId,{productId:productId,quantity:quantity2})
                    .then(()=>{
                        return Delivery.find()
                    })
                    .then(deliveries2=>{
                        expect(deliveries2).to.exist
                        expect(deliveries2.length).to.equal(1)
                        const [delivery2]= deliveries2
                        expect(delivery2.client.toString()).to.equal(clientId)
                        expect(delivery2.products).to.be.instanceOf(Array)
                        expect(delivery2.products.length).to.equal(2)
                        expect(delivery2.products[0].product.toString()).to.equal(productQuantity.productId)
                        expect(delivery2.products[0].quantity).to.equal(productQuantity.quantity)
                        expect(delivery2.products[1].product.toString()).to.equal(productId)
                        expect(delivery2.products[1].quantity).to.equal(quantity2)
                    })
            })
    })
    it("should return an error when trying to add a product to a delivery that does not exist",()=>{
        const id= mongoose.ObjectId().toString()
        return addProductToDelivery(id,productQuantity)
            .catch(error=>{
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`delivery with id ${id} does not exist`)
            })
    })
    it("should return an error when trying to add a product that does not exist",()=>{
        const id= mongoose.ObjectId().toString()
        productQuantity.productId=id
        return addProductToDelivery(deliveryId,productQuantity)
            .catch(error=>{
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`product with id ${id} does not exist`)
            })
    })
    it("should throw an error when not given the delivery or the productQuantity",()=>{
        expect(()=>{addProductToDelivery()}).to.throw("undefined is not a string")
        expect(()=>{addProductToDelivery(clientId)}).to.throw("undefined is not an object")
    })
    it("should throw an error when the parameters don't match the format",()=>{
        expect(()=>{addProductToDelivery(123,productQuantity)}).to.throw("123 is not a string")
        expect(()=>{addProductToDelivery([],productQuantity)}).to.throw(" is not a string")
        expect(()=>{addProductToDelivery({},productQuantity)}).to.throw("[object Object] is not a string")
        expect(()=>{addProductToDelivery(clientId,"string")}).to.throw("string is not an object")
        expect(()=>{addProductToDelivery(clientId,[])}).to.throw("undefined is not a string")
        expect(()=>{addProductToDelivery(clientId,123)}).to.throw("123 is not an object")
        productQuantity.productId=123
        expect(()=>{addProductToDelivery(clientId,productQuantity)}).to.throw("123 is not a string")
        productQuantity.productId=productId
        productQuantity.quantity="string"
        expect(()=>{addProductToDelivery(clientId,productQuantity)}).to.throw("string is not a number")
    })

    afterEach(async()=>{
        await Client.deleteMany()
        await Delivery.deleteMany()
        await Product.deleteMany()
    })
    after(mongoose.disconnect)
})