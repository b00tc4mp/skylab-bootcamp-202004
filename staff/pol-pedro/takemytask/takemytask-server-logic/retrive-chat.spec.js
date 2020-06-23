require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL  } } = process

const retriveChat = require('./retrive-chat')
const { random } = Math
const { expect } = require('chai')
require('takemytask-commons/polyfills/json')
const { utils: { jwtPromised } } = require('takemytask-commons')
const { mongoose, models: { Chat, User, Worker, Comments }, mongoose: {ObjectId} } = require('takemytask-data')
const bcrypt = require('bcryptjs')
require('takemytask-commons/ponyfills/xhr')

describe('logic - retrieve chat', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, adress, bankAcount, description, pricingHour, jobCategories, workingDistance, workerId, userId, chatId, message

    beforeEach(async () => {
        await User.deleteMany()
        await Worker.deleteMany()
        await Chat.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        adress = `street-${random()}`

        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({name, surname, email, password: hash, adress})
        
        userId = user.id.toString()
    
        nameW = `name-${random()}`
        surnameW = `surname-${random()}`
        emailW = `e-${random()}@mail.com`
        passwordW = `password-${random()}`
        adressW = `street-${random()}`
        bankAcount = `bankAcount-${random()}`
        description = `description-${random()}`
        pricingHour = random()*10
        jobCategories = `jobCategories-${random()}`
        workingDistance = random()*10

        const hashW = await bcrypt.hash(password, 10)

        const worker = await Worker.create({name: nameW, surname: surnameW, email: emailW, password: hashW, adress, adressW, bankAcount, description, pricingHour, jobCategories, workingDistance})

        workerId = worker.id.toString()

        const chat = await Chat.create({
            user: ObjectId(userId), 
            worker: ObjectId(workerId), 
            date: new Date
        })

        message = 'hello' + worker.name

        chat.messages.unshift( new Comments ({
            userId: ObjectId(userId),
            name: name,
            surname: surname,
            text: message,
            date: new Date
        }))

        await chat.save()

        chatId = chat._id.toString()

    })

    it('should succeed on valid data', async () => {
        const result = await retriveChat(chatId)

        expect(result).to.exist

        expect(result.user.toString()).to.equal(userId.toString())
        expect(result.worker.toString()).to.equal(workerId.toString())
        expect(result.messages[0].name).to.equal(name)
        expect(result.messages[0].surname).to.equal(surname)
        expect(result.messages[0].text).to.equal(message)
    })

    it('sould fail when empty chat id', async () => {
        try{
            const result = await retriveChat("")
        }catch({message}){
            expect(message).to.exist
            expect(message).to.equal('string is empty or blank')
        }
    })

    it('sould fail when empty non existant chat id', async () => {
        
        const result = await retriveChat("5ef1152a504970548076a9a5")
            .then()
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.equal(`chat with id: 5ef1152a504970548076a9a5 dont exists`)
            })
        
    })
    


    // describe('when user already exists', () => {
    //     beforeEach(() => Worker.create({ name, surname, email, password, adress, bankAcount, description, presentation, pricingHour, jobCategories, workingDistance }))

    //     it('should fail on trying to register an existing user', async () => {
    //         try {
    //             await registerWorker(name, surname, email, password, adress, bankAcount, description, presentation, pricingHour, jobCategories, workingDistance)

    //             throw new Error('should not reach this point')
    //         } catch (error) {
    //             expect(error).to.exist

    //             expect(error).to.be.an.instanceof(Error)
    //             expect(error.message).to.equal(`worker with e-mail ${email} already exists`)
    //         }
    //     })
    // })

    afterEach(() => Worker.deleteMany())

    after(mongoose.disconnect)
})