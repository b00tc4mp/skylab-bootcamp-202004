require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const makeEmptyDelivery= require("./make-empty-delivery")
const {random}= Math
const { expect } = require('chai')
const {mongoose, models:{Client,Delivery}}= require("facturator-data")
require('facturator-commons/ponyfills/xhr')
const context = require('./context')

describe("makeEmptyDelivery",()=>{
    before(()=>{mongoose.connect(MONGODB_URL)})

    let name, establishment, contactNumber, email,direction, paymentMethod, paymentInfo, clientId

    beforeEach(async()=>{
        await Client.deleteMany()
        name = `name-${random()}`
        establishment = `establishment-${random()}`
        contactNumber= random()
        email = `e-${random()}@mail.com`
        direction=`direction-${random()}`
        paymentMethod=`paymentMethod-${random()}`
        paymentInfo=`paymentInfo-${random()}`
        const client=await Client.create({name,establishment,contactNumber,email,direction,paymentInfo,paymentMethod})
        clientId= client._id.toString()
    })
    it("should create a new delivery without products for a specified client",()=>{
        return makeEmptyDelivery(clientId)
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
                expect(delivery.amount).to.equal(0)
                expect(delivery.paid).to.equal(false)
            })
    })
    it("should throw an error when not given a clientId",()=>{
        expect(()=>{makeEmptyDelivery()}).to.throw(TypeError,"undefined is not a string")
    })
    it("should throw an error when clietnId is not a string",()=>{
        expect(()=>{makeEmptyDelivery(123)}).to.throw(TypeError,"123 is not a string")
    })
    it("should return an error when given a client that does not exist",()=>{
        const id=mongoose.ObjectId().toString()
        return makeEmptyDelivery(id)
            .catch(error=>{
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`client with id ${id} does not exist`)
            })
    })
    afterEach(async()=>{
        await Client.deleteMany()
        await Delivery.deleteMany()
    })
    after(mongoose.disconnect)
})