require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL  } } = process

const addRate = require('./add-rate')
const { random } = Math
const { expect } = require('chai')
require('takemytask-commons/polyfills/json')
const { utils: { jwtPromised } } = require('takemytask-commons')
const { mongoose, models: {User, Worker }, mongoose: {ObjectId} } = require('takemytask-data')
require('takemytask-commons/ponyfills/xhr')
const context = require('./context')

context.API_URL = API_URL

context.storage = {}

describe('logic - add rate', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, adress, bankAcount, description, pricingHour, jobCategories, workingDistance, workerId, rate, userId

    beforeEach(async () => {

        await User.deleteMany()
        await Worker.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        adress = `street-${random()}`
    
        nameW = `name-${random()}`
        surnameW = `surname-${random()}`
        emailW = `e-${random()}@mail.com`
        passwordW = `password-${random()}`
        adressW = `street-${random()}`
        bankAcount = `bankAcount-${random()}`
        presentation = `presentation-${random()}`
        description = `description-${random()}`
        pricingHour = random()*10
        jobCategories = `jobCategories-${random()}`
        workingDistance = random()*10

        const worker = await Worker.create({name: nameW, surname: surnameW, email: emailW, password, adress, adressW, bankAcount, description, presentation, pricingHour, jobCategories, workingDistance})

        workerId = worker.id 

        rate = parseInt(random() * 6)

    })
    describe('user exists', () => {
        beforeEach(async () => {
            const user = await User.create({name, surname, email, password, adress})

            userId = user._id

            return jwtPromised.sign({ sub: user.id }, SECRET)
                .then((token) => context.storage.token = token)
        })

        it('should succeed on adding rate', async () => {
            await addRate(workerId, rate)

            const results = await Worker.find()

            const [worker] = results

            expect(worker).to.exist
            expect(worker.ratesWorker).to.exist
            expect(worker.ratesWorker[0].userId.toString()).to.be.equal(userId.toString())
            expect(worker.ratesWorker[0].stars).to.be.equal(rate)
        })

        it('should fail on adding rate', async () => {
            try{

                await addRate(workerId, "")

            }catch({message}){
                expect(message).to.exist
                expect(message).to.equal(' is not an integer number')
            }
        })
    })

    describe('chat dont exists', () => {
        let fakeId
        beforeEach(async() => {
            fakeId = '5ee0ed9a603a0a4f3c650fe1'
            return jwtPromised.sign({ sub: fakeId }, SECRET)
                .then((token) => context.storage.token = token)
        })
        it('sould fail when user id has no chat', async () => {
        
            const result = await addRate(fakeId, rate)
                .then()
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`worker with id ${fakeId} dont exists`)
                })
            
        })
    })

    afterEach(() => Worker.deleteMany(), User.deleteMany())

    after(mongoose.disconnect)
})