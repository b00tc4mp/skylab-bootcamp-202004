require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL  } } = process

const updateUser = require('./update-user')
const { random } = Math
const { expect } = require('chai')
require('takemytask-commons/polyfills/json')
const { utils: { jwtPromised } } = require('takemytask-commons')
const { mongoose, models: { Worker }, mongoose: {ObjectId} } = require('takemytask-data')
const bcrypt = require('bcryptjs')
require('takemytask-commons/ponyfills/xhr')
const context = require('./context')

context.API_URL = API_URL

context.storage = {}

describe('logic - update worker', () => {
    before(() => mongoose.connect(MONGODB_URL))
    
    let name, surname, email, password, adress, body, changedName, changedAdress

    beforeEach(async () => {
        await Worker.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        adress = `street-${random()}`
        bankAcount = `bankAcount-${random()}`
        description = `description-${random()}`
        presentation = `presentation-${random()}`
        pricingHour = parseInt(random()*100)
        jobCategories = [`jobCategories-${random()}`]
        workingDistance = parseInt(random()*100)


        changedName = `changedname-${random()}`
        changedAdress = `changedstreet-${random()}`

    })
    
    describe('user exists', () => {
        beforeEach(async () => {
            const user = await Worker.create({name, surname, email, password, adress, bankAcount, description, presentation, pricingHour, jobCategories, workingDistance})

            return jwtPromised.sign({ sub: user.id }, SECRET)
                .then((token) => context.storage.token = token)
        })

        it('should succeed on retriving user', async () => {
            await updateUser(changedName, surname, email, changedAdress, bankAcount, description, presentation, pricingHour, jobCategories, workingDistance)

            const results = await Worker.find()

            const [user] = results

            expect(user).to.exist
            expect(user.name).to.equal(changedName)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.adress).to.equal(changedAdress)
            expect(user.bankAcount).to.equal(bankAcount)
            expect(user.description).to.equal(description)
            expect(user.pricingHour).to.equal(pricingHour)
            expect(user.jobCategories.toString()).to.equal(jobCategories.toString())
            expect(user.workingDistance).to.equal(workingDistance)
        })
    })
      
    describe('user dont exist', () => {
        let fakeId
        beforeEach(async() => {
            fakeId = '5ee0ed9a603a0a4f3c650fe1'
            return jwtPromised.sign({ sub: fakeId }, SECRET)
                .then((token) => context.storage.token = token)
        })
        it('should fail on retriving user', async () => {
            result = await updateUser(changedName, surname, email, changedAdress, bankAcount, description, presentation, pricingHour, jobCategories, workingDistance)
                .catch( error => {
                    expect(error).to.exist
                    expect(error.message).to.be.equal(`user or worker with id ${fakeId} dont exists`)
                })
        })
    })
    
    //TODO finish test with unhappy path

    afterEach(() => Worker.deleteMany())

    after(mongoose.disconnect)
})