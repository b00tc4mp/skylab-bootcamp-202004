require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const removeClient= require("./remove-client")
const {random}= Math
const { expect } = require('chai')
const {mongoose, models:{Client}}= require("facturator-data")
require('facturator-commons/ponyfills/xhr')
const context = require('./context')

context.API_URL = API_URL

describe("removeClient",()=>{
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
    it("should remove a client given it's id",()=>{
        return Client.find()
            .then(clients=>{
                expect(clients.length).to.equal(1)
                return removeClient(clientId)
                    .then(result=>{
                        expect(result).to.be.undefined
                        return Client.find()
                            .then(clients=>{
                                expect(clients.length).to.equal(0)
                            })
                    })
            })
    })
    it("should throw an error when trying to remove a client that does not exist",()=>{
        const id = mongoose.ObjectId().toString()
        return removeClient(id)
            .catch(error=>{
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`client with id ${id} does not exist`)
            })
    })
    it("should throw an error when not given an id string",()=>{
        expect(()=>{removeClient()}).to.throw(TypeError,"undefined is not a string")
    })
    afterEach(() => Client.deleteMany())

    after(mongoose.disconnect)
})