require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const addClient= require("./add-client")
const {random}= Math
const { expect } = require('chai')
const {mongoose, models:{Client}}= require("facturator-data")
require('facturator-commons/ponyfills/xhr')
const context = require('./context')

context.API_URL = API_URL

describe("addClient", ()=>{
    before(() => mongoose.connect(MONGODB_URL))

    let name, establishment, contactNumber, email,direction, paymentMethod, paymentInfo, newClient

    beforeEach(() =>
        Client.deleteMany()
            .then(() => {
                name = `name-${random()}`
                establishment = `establishment-${random()}`
                contactNumber= random()
                email = `e-${random()}@mail.com`
                direction=`direction-${random()}`
                paymentMethod=`paymentMethod-${random()}`
                paymentInfo=`paymentInfo-${random()}`
                newClient={name,establishment,contactNumber,email,direction,paymentMethod,paymentInfo}
            })
    )
    it("should succeed on valid data",()=>{
        return addClient(newClient)
            .then(result=> {
                expect(result).to.be.undefined
                return Client.find()
                    .then(clients=>{
                        expect(clients.length).to.equal(1)
                        const [client] = clients
                        expect(client.name).to.equal(name)
                        expect(client.establishment).to.equal(establishment)
                        expect(client.contactNumber).to.equal(contactNumber)
                        expect(client.email).to.equal(email)
                        expect(client.direction).to.equal(direction)
                        expect(client.paymentMethod).to.equal(paymentMethod)
                        expect(client.paymentInfo).to.equal(paymentInfo)
                    })
            })
    })
    it("should work given only the name and the payment method",()=>{
        const testClient={name,paymentMethod}
        return addClient(testClient)
            .then(result=>{
                expect(result).to.be.undefined
                return Client.find()
                    .then(clients=>{
                        expect(clients.length).to.equal(1)
                        const [client]= clients
                        expect(client.name).to.equal(name)
                        expect(client.establishment).to.be.undefined
                        expect(client.contactNumber).to.be.undefined
                        expect(client.email).to.be.undefined
                        expect(client.direction).to.be.undefined
                        expect(client.paymentMethod).to.equal(paymentMethod)
                        expect(client.paymentInfo).to.be.undefined
                    })
            })
    })
    it("should throw an error when not given a name",()=>{
        delete newClient.name
        expect(()=>{
            addClient(newClient)
        }).to.throw(TypeError,"undefined is not a string")
    })
    it("should throw an error when not given a payment method",()=>{
        delete newClient.paymentMethod
        expect(()=>{
            addClient(newClient)
        }).to.throw(TypeError,"undefined is not a string")
    })
    it("should throw an error when not given the client as an object", ()=>{
        expect(()=>{
            addClient()
        }).to.throw(TypeError,"undefined is not an object")
    })
    it("should throw an error when the values of the client object are not of the required type",()=>{
        newClient.name=789
        expect(()=>{addClient(newClient)}).to.throw(TypeError,"789 is not a string")
        newClient.name=name
        newClient.establishment=789
        expect(()=>{addClient(newClient)}).to.throw(TypeError,"789 is not a string")
        newClient.establishment=establishment
        newClient.contactNumber="test"
        expect(()=>{addClient(newClient)}).to.throw(TypeError,"test is not a number")
        newClient.contactNumber=contactNumber
        newClient.email=789
        expect(()=>{addClient(newClient)}).to.throw(Error,"789 is not an e-mail")
        newClient.email=email
        newClient.direction=789
        expect(()=>{addClient(newClient)}).to.throw(TypeError,"789 is not a string")
        newClient.direction=direction
        newClient.paymentMethod=789
        expect(()=>{addClient(newClient)}).to.throw(TypeError,"789 is not a string")
        newClient.paymentMethod=paymentMethod
        newClient.paymentInfo=789
        expect(()=>{addClient(newClient)}).to.throw(TypeError,"789 is not a string")
        newClient.paymentInfo=paymentInfo
    })
    afterEach(() => Client.deleteMany())

    after(mongoose.disconnect)
})