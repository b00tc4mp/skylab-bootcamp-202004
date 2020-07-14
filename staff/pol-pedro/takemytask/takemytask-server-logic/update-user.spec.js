require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL  } } = process

const updateUser = require('./update-user')
const { random } = Math
const { expect } = require('chai')
require('takemytask-commons/polyfills/json')
const { utils: { jwtPromised } } = require('takemytask-commons')
const { mongoose, models: { User, Worker }, mongoose: {ObjectId} } = require('takemytask-data')
const bcrypt = require('bcryptjs')
require('takemytask-commons/ponyfills/xhr')

describe('logic - update user', () => {
    before(() => mongoose.connect(MONGODB_URL))
    
    let name, surname, email, password, adress, body, changedName, changedAdress, userId, nameW, surnameW, emailW, passwordW, adressW, bankAcount, description, pricingHour, jobCategories, workingDistance, workerId

    beforeEach(async () => {
        await User.deleteMany()

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
        description = `description-${random()}`
        pricingHour = random()*10
        jobCategories = [`jobCategories-${random()}`]
        workingDistance = random()*10


        const worker = await Worker.create({name: nameW, surname: surnameW, email: emailW, password: passwordW, adress: adressW, bankAcount, description, pricingHour, jobCategories, workingDistance})

        workerId = worker.id 

            changedName = `changedname-${random()}`
            changedAdress = `changedstreet-${random()}`

        body={
            name: changedName,
            adress: changedAdress 
        }

    })
    
    describe('user exists', () => {
        beforeEach(async () => {
            const user = await User.create({name, surname, email, password, adress})
            userId = user.id
        })

        it('should succeed on retriving user', async () => {
            await updateUser(userId, body)

            const results = await User.find()

            const [user] = results

            expect(user).to.exist
            expect(user.name).to.be.equal(changedName)
            expect(user.surname).to.be.equal(surname)
            expect(user.email).to.be.equal(email)
            expect(user.adress).to.be.equal(changedAdress)
        })
    })
      
    describe('user dont exist', () => {
        let fakeId
        beforeEach(async() => {
            fakeId = '5ee0ed9a603a0a4f3c650fe1'
        })
        it('should fail on retriving user', async () => {
            result = await updateUser(fakeId, body)
                .catch( error => {
                    expect(error).to.exist
                    expect(error.message).to.be.equal(`user or worker with id ${fakeId} dont exists`)
                })
        })
    })
    
    //TODO finish test with unhappy path

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})