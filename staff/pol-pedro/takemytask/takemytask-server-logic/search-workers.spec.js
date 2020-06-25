require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL  } } = process

const searchWorker = require('./search-workers')
const { random } = Math
const { expect } = require('chai')
require('takemytask-commons/polyfills/json')
const { mongoose, models: {Worker}, mongoose: {ObjectId} } = require('takemytask-data')
const bcrypt = require('bcryptjs')
require('takemytask-commons/ponyfills/xhr')

describe('logic - search worker', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, adress, bankAcount, description, pricingHour, jobCategories, workingDistance, workerId

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        adress = `street-${random()}`
        bankAcount = `bankAcount-${random()}`
        description = `description-${random()}`
        pricingHour = random()*10
        jobCategories = [`jobCategories-${random()}`]
        workingDistance = random()*10

        const hashW = await bcrypt.hash(password, 10)

        const worker = await Worker.create({name: name, surname: surname, email: emailW, password: hashW, adress, adressW, bankAcount, description, pricingHour, jobCategories, workingDistance})

        workerId = worker.id 
    })

    it('should succeed on search by name', async () => {
        const result = await searchWorker(true, true, name)

        expect(result).to.exist

        expect(result[0].id.toString()).to.equal(workerId.toString())
        expect(result[0].name).to.equal(name)
    })

    it('should succeed on search by category', async () => {
        const result = await searchWorker(true, true, jobCategories[0])

        expect(result).to.exist

        expect(result[0].id.toString()).to.equal(workerId.toString())
        expect(result[0].name).to.equal(name)
    })

    it('should fail on void string', async () => {
        try{
            const result = await searchWorker(true, true, "")
        }catch({message}){
            expect(message).to.exist
            expect(message).to.equal('string is empty or blank')
        }
    })

    afterEach(() => Worker.deleteMany())

    after(mongoose.disconnect)
})