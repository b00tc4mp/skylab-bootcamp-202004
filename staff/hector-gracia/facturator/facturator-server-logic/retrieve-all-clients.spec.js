require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveAllClients = require('./retrieve-all-clients')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { Client } } = require('facturator-data')

describe('retrieveClient', () => {
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
                const client2=await Client.create({ name:name+2, establishment, contactNumber, email, direction, paymentMethod, paymentInfo})
                clientId= client._id.toString()
            })
    )
    it("should retrieve all the clients",async ()=>{
        const clients= await retrieveAllClients(clientId)
        expect(clients).to.exist
        expect(clients.length).to.equal(2)
        const[client1,client2]=clients
        expect(client1.name).to.equal(name)
        expect(client1.establishment).to.equal(establishment)
        expect(client1.contactNumber).to.equal(contactNumber)
        expect(client1.email).to.equal(email)
        expect(client1.direction).to.equal(direction)
        expect(client1.paymentMethod).to.equal(paymentMethod)
        expect(client1.paymentInfo).to.equal(paymentInfo)
        expect(client1._id).to.not.exist
        expect(client1.id).to.exist
        expect(client2.name).to.equal(name+2)
        expect(client2.establishment).to.equal(establishment)
        expect(client2.contactNumber).to.equal(contactNumber)
        expect(client2.email).to.equal(email)
        expect(client2.direction).to.equal(direction)
        expect(client2.paymentMethod).to.equal(paymentMethod)
        expect(client2.paymentInfo).to.equal(paymentInfo)
        expect(client2._id).to.not.exist
        expect(client2.id).to.exist
    })
    it("should return an empty array if there are no clients",async()=>{
        await Client.deleteMany()
        const clients= await retrieveAllClients()
        expect(clients).to.be.instanceOf(Array)
        expect(clients.length).to.equal(0)
    })
    afterEach(() => Client.deleteMany())

    after(mongoose.disconnect)
})