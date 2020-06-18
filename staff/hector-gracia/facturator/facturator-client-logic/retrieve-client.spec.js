require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const retrieveClient= require("./retrieve-client")
const {random}= Math
const { expect } = require('chai')
const {mongoose, models:{Client}}= require("facturator-data")
require('facturator-commons/ponyfills/xhr')
const context = require('./context')

context.API_URL = API_URL

describe("retrieveClient",()=>{
    before(() => mongoose.connect(MONGODB_URL))

    let name, establishment, contactNumber, email,direction, paymentMethod, paymentInfo, clientId

    beforeEach(() =>
        Client.deleteMany()
            .then(async () => {
                name = `name-${random()}`
                establishment = `establishment-${random()}`
                contactNumber= random()
                email = `e-${random()}@mail.com`
                direction=`direction-${random()}`
                paymentMethod=`paymentMethod-${random()}`
                paymentInfo=`paymentInfo-${random()}`
                const client= await Client.create({ name, establishment, contactNumber, email, direction, paymentMethod, paymentInfo})
                clientId= client._id.toString()
            })
    )
    it("should succeed when given an existing clientId",()=>{
        return retrieveClient(clientId)
            .then(client=>{
                expect(client).to.exist
                expect(client.name).to.equal(name)
                expect(client.establishment).to.equal(establishment)
                expect(client.contactNumber).to.equal(contactNumber)
                expect(client.email).to.equal(email)
                expect(client.direction).to.equal(direction)
                expect(client.paymentMethod).to.equal(paymentMethod)
                expect(client.paymentInfo).to.equal(paymentInfo)
                expect(client.id).to.equal(clientId)
                expect(client._id).to.be.undefined
            })
    })
    it("should throw an error when not given an id string",()=>{
        expect(()=>{retrieveClient()}).to.throw(TypeError,"undefined is not a string")
    })
    it("should throw an error when given an id that does not exist",()=>{
        const id= mongoose.ObjectId().toString()
        return retrieveClient(id)
            .catch(error=>{
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`client with id ${id} does not exist`)
            })
    })

    afterEach(() => Client.deleteMany())

    after(mongoose.disconnect)
})