require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const updateClient= require("./update-client")
const {random}= Math
const { expect } = require('chai')
const {mongoose, models:{Client}}= require("facturator-data")
require('facturator-commons/ponyfills/xhr')
const context = require('./context')

context.API_URL = API_URL

describe("updateClient",()=>{
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
    it("should succeed when given an existing id an correct parameters",()=>{
        const newName= `newName-${random()}`
        return updateClient({name:newName,clientId})
            .then(result=>{
                expect(result).to.be.undefined
                return Client.find()
                    .then(clients=>{
                        expect(clients.length).to.equal(1)
                        const [client] = clients
                        expect(client.name).to.equal(newName)
                        expect(client.establishment).to.equal(establishment)
                        expect(client.contactNumber).to.equal(contactNumber)
                        expect(client.email).to.equal(email)
                        expect(client.direction).to.equal(direction)
                        expect(client.paymentMethod).to.equal(paymentMethod)
                        expect(client.paymentInfo).to.equal(paymentInfo)
                        expect(client._id.toString()).to.equal(clientId)
                    })
            })
    })
    it("should throw an error when given an id that does not exist",()=>{
        const id= mongoose.ObjectId().toString()
        const newName= `newName-${random()}`

        updateClient({name: newName,clientId:id})
            .catch(error=>{
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`client with id ${id} does not exist`)
            })
    })
    it("should throw an error when given wrong type of parameters",()=>{
        const updatedClient={ name, establishment, contactNumber, email, direction, paymentMethod, paymentInfo,clientId}
        updatedClient.name=789
        expect(()=>{updateClient(updatedClient)}).to.throw(TypeError,"789 is not a string")
        updatedClient.name=name
        updatedClient.establishment=789
        expect(()=>{updateClient(updatedClient)}).to.throw(TypeError,"789 is not a string")
        updatedClient.establishment=establishment
        updatedClient.contactNumber="test"
        expect(()=>{updateClient(updatedClient)}).to.throw(TypeError,"test is not a number")
        updatedClient.contactNumber=contactNumber
        updatedClient.email=789
        expect(()=>{updateClient(updatedClient)}).to.throw(Error,"789 is not an e-mail")
        updatedClient.email=email
        updatedClient.direction=789
        expect(()=>{updateClient(updatedClient)}).to.throw(TypeError,"789 is not a string")
        updatedClient.direction=direction
        updatedClient.paymentMethod=789
        expect(()=>{updateClient(updatedClient)}).to.throw(TypeError,"789 is not a string")
        updatedClient.paymentMethod=paymentMethod
        updatedClient.paymentInfo=789
        expect(()=>{updateClient(updatedClient)}).to.throw(TypeError,"789 is not a string")
    })

    afterEach(() => Client.deleteMany())

    after(mongoose.disconnect)
})