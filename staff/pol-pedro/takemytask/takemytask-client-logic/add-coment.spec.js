require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL  } } = process

const addComent = require('./add-coment')
const { random } = Math
const { expect } = require('chai')
require('takemytask-commons/polyfills/json')
const { utils: { jwtPromised } } = require('takemytask-commons')
const { mongoose, models: {User, Worker }, mongoose: {ObjectId} } = require('takemytask-data')
const bcrypt = require('bcryptjs')
require('takemytask-commons/ponyfills/xhr')
const context = require('./context')

context.API_URL = API_URL

context.storage = {}

describe('logic - add coment', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, adress, bankAcount, description, pricingHour, jobCategories, workingDistance, workerId, coment, userId

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

        coment = `coment-${random()}`

    })
    describe('user exists', () => {
        beforeEach(async () => {
            const user = await User.create({name, surname, email, password, adress})

            userId = user._id

            return jwtPromised.sign({ sub: user.id }, SECRET)
                .then((token) => context.storage.token = token)
        })

        it('should succeed on adding coment', async () => {
            await addComent(workerId, coment)

            const results = await Worker.find()

            const [worker] = results

            expect(worker).to.exist
            expect(worker.comentsWorker).to.exist
            expect(worker.comentsWorker[0].userId.toString()).to.be.equal(userId.toString())
        })

        it('should succeed on adding coment', async () => {
            try{

                await addComent(workerId, "")

            }catch({message}){
                expect(message).to.exist
                expect(message).to.equal("string is empty or blank")
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
        
            const result = await addComent(fakeId, coment)
                .then()
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`user with id ${fakeId} dont exists`)
                })
            
        })
    })

    afterEach(() => Worker.deleteMany(), User.deleteMany())

    after(mongoose.disconnect)
})