require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const registerWorker = require('./register-worker')
const { random } = Math
const { expect } = require('chai')
require('takemytask-commons/polyfills/json')
const { mongoose, models: { Worker } } = require('takemytask-data')
const bcrypt = require('bcryptjs')

describe('logic - register worker', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, adress, bankAcount, description, pricingHour, jobCategories, workingDistance

    beforeEach(async () => {
        await Worker.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        adress = `street-${random()}`
        bankAcount = `bankAcount-${random()}`
        presentation = `presentation-${random()}`
        description = `description-${random()}`
        pricingHour = parseInt(random()*100)
        jobCategories = [`"jobCategories-${random()}"`]
        workingDistance = parseInt(random()*100)
    })

    it('should succeed on valid data', async () => {
        const result = await registerWorker(name, surname, email, password, adress, bankAcount, description, presentation, pricingHour, jobCategories, workingDistance)

        expect(result).to.be.undefined

        const users = await Worker.find()

        expect(users.length).to.equal(1)

        const [user] = users

        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.adress).to.equal(adress)
        expect(user.bankAcount).to.equal(bankAcount)
        expect(user.description).to.equal(description)
        expect(user.pricingHour).to.equal(pricingHour)
        expect(user.jobCategories.toString()).to.equal(jobCategories.toString())
        expect(user.workingDistance).to.equal(workingDistance)

        const match = await bcrypt.compare(password, user.password)

        expect(match).to.be.true
    })

    it('should fail on invalid argument', async () => {
        try{

            const result = await registerWorker(undefined, surname, email, password, adress)
            expect(result).to.exist
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('undefined is not a string')
        }
    })



    describe('when user already exists', () => {
        beforeEach(() => Worker.create({ name, surname, email, password, adress, bankAcount, description, presentation, pricingHour, jobCategories, workingDistance }))

        it('should fail on trying to register an existing user', async () => {
            try {
                await registerWorker(name, surname, email, password, adress, bankAcount, description, presentation, pricingHour, jobCategories, workingDistance)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`worker with e-mail ${email} already exists`)
            }
        })
    })

    afterEach(() => Worker.deleteMany())

    after(mongoose.disconnect)
})