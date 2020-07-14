require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const retrieveDeliveryList= require("./retrieve-delivery-list")
const {random}= Math
const { expect } = require('chai')
const {mongoose, models:{Client,Delivery,Product}}= require("facturator-data")
require('facturator-commons/ponyfills/xhr')
const context = require('./context')

describe("retrieveDeliveryList",()=>{
    before(()=>{mongoose.connect(MONGODB_URL)})
    //Client
    let clientName, clientEstablishment, clientContactNumber, clientEmail, clientDirection, clientPaymentMethod, clientPaymentInfo, clientId
    //Product
    let productName, productDescription, productPrice,productTax, productAlergens, productId
    let productQuantity,productQuantity2
    //Delivery
    let delivery1,delivery2,deliveryId1,deliveryId2

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
        productQuantity2={}
        productQuantity2.product=productId
        productQuantity2.quantity= Math.floor(random()*10)
        //Delivery
        delivery1={client:client._id,products:productQuantity,amount:0,paid:false}
        delivery2={client:client._id,products:productQuantity2,amount:0,paid:true}
        const deliveryDb= await Delivery.create(delivery1)
        deliveryId1= deliveryDb._id.toString()
        const deliveryDb2= await Delivery.create(delivery2)
        deliveryId2= deliveryDb2._id.toString()
    })
    it("should return a list with all the deliveries",()=>{
        return retrieveDeliveryList()
            .then(deliveries=>{
                expect(deliveries).to.exist
                expect(deliveries.length).to.equal(2)
                const[del1,del2]= deliveries

                expect(del1.id).to.equal(deliveryId1)
                expect(del1.client.id).to.equal(clientId)
                expect(del1.client.name).to.equal(clientName)
                expect(del1.paid).to.equal(delivery1.paid)
                expect(del1.date).to.equal(delivery1.date)
                expect(del1.amount).to.equal(delivery1.amount)

                expect(del2.id).to.equal(deliveryId2)
                expect(del2.client.id).to.equal(clientId)
                expect(del2.client.name).to.equal(clientName)
                expect(del2.paid).to.equal(delivery2.paid)
                expect(del2.date).to.equal(delivery2.date)
                expect(del2.amount).to.equal(delivery2.amount)
            })
    })
    it("should return a sanitized list",()=>{
        return retrieveDeliveryList()
            .then(deliveries=>{
                expect(deliveries).to.be.instanceOf(Array)
                const[del1,del2]= deliveries

                expect(del1._id).to.not.exist
                expect(del1.__v).to.not.exist
                expect(del1.client._id).to.not.exist
                expect(del1.client.__v).to.not.exist

                expect(del2._id).to.not.exist
                expect(del2.__v).to.not.exist
                expect(del2.client._id).to.not.exist
                expect(del2.client.__v).to.not.exist
            })
    })
    afterEach(async()=>{
        await Client.deleteMany()
        await Delivery.deleteMany()
        await Product.deleteMany()
    })
    after(mongoose.disconnect)
})