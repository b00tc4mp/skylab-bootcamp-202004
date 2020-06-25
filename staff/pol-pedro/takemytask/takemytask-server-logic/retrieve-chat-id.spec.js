require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL  } } = process

const retriveChats = require('./retive-chat-id')
const { random } = Math
const { expect } = require('chai')
require('takemytask-commons/polyfills/json')
const { utils: { jwtPromised } } = require('takemytask-commons')
const { mongoose, models: { Chat, User, Worker, Comments }, mongoose: {ObjectId} } = require('takemytask-data')
const bcrypt = require('bcryptjs')
require('takemytask-commons/ponyfills/xhr')
describe('logic - retrive chats', () => {
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
        const result = await retriveChats(userId)

        expect(result).to.exist

        // expect(result[0]._id.toString()).to.equal(chatId)
        // expect(result[0].user.toString()).to.equal(userId.toString())
        // expect(result[0].worker.toString()).to.equal(workerId.toString())
        expect(result[0].messages[0].name).to.equal(name)
        expect(result[0].messages[0].surname).to.equal(surname)
        expect(result[0].messages[0].text).to.equal(message)
    })

    describe('chat dont exists', () => {
        let fakeId
        beforeEach(async() => {
            fakeId = '5ee0ed9a603a0a4f3c650fe1'
        })
        it('sould fail when user id has no chat', async () => {
        
            const result = await retriveChats(userId)
                .then()
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`user with id: 5ee0ed9a603a0a4f3c650fe1 dont exists`)
                })
            
        })
    })

    afterEach(() => Worker.deleteMany(), User.deleteMany(), Chat.deleteMany())

    after(mongoose.disconnect)
})