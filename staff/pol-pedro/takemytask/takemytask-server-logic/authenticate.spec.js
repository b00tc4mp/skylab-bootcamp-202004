require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const authenticate = require('./authenticate')
const { random } = Math
const { expect } = require('chai')
require('takemytask-commons/polyfills/json')
const { mongoose, models: { User , Worker} } = require('takemytask-data')
const bcrypt = require('bcryptjs')

describe('logic - authenticate user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, adress

    beforeEach(async () => {
        await User.deleteMany()
        await Worker.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        adress = `street-${random()}`

        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({name, surname, email, password: hash, adress})

        userId = user.id
    })

    it('should succeed on correct credentials for user', async () => {
        await authenticate(email, password)
            .then((_userId) => {
                expect(_userId).to.exist
                expect(_userId).to.equal(userId)
            })
    })

    it('should fail on wrong password', async () => {
        await authenticate(email, 'password')
            .catch((error) => {
                expect(error).to.exist
                expect(error.message).to.equal(`Wrong email or password`)
            })
    })

    it('should fail on invalid email', async () => {
       try {    
           await authenticate('email', password)
       } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`email is not an e-mail`)
       } 
    })

    describe('logic - authenticate worker', () => {
    
        let name, surname, email, password, adress, bankAcount, description, pricingHour, jobCategories, workingDistance, userId, workerId
    
        beforeEach(async () => {
            await User.deleteMany()
            await Worker.deleteMany()
    
            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`
            adress = `street-${random()}`
            bankAcount = `bankAcount-${random()}`
            description = `description-${random()}`
            pricingHour = random()*10
            jobCategories = `jobCategories-${random()}`
            workingDistance = random()*10
    
            const hash = await bcrypt.hash(password, 10)
    
            const worker = await Worker.create({name, surname, email, password: hash, adress, bankAcount, description, pricingHour, jobCategories, workingDistance})
    
            workerId = worker.id 
        })
    
        it('should succeed on correct credentials for worker', async () => {
            await authenticate(email, password)
                .then((_userId) => {
                    expect(_userId).to.exist
                    expect(_userId).to.equal(workerId)
                })
        })
    
        it('should fail on wrong password', async () => {
            await authenticate(email, 'password', 'user')
                .catch((error) => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`Wrong email or password`)
                })
        })

        it('should fail on invalid email', async () => {
            try {    
                await authenticate('email', password)
            } catch (error) {
                 expect(error).to.exist
                 expect(error.message).to.equal(`email is not an e-mail`)
            } 
         })
    })
    

    afterEach(() => User.deleteMany(), Worker.deleteMany())

    after(mongoose.disconnect)
})