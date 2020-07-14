require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL  } } = process

const addMessage = require('./add-message')
const { random } = Math
const { expect } = require('chai')
require('takemytask-commons/polyfills/json')
const { utils: { jwtPromised } } = require('takemytask-commons')
const { mongoose, models: {User, Worker, Chat, Comments }, mongoose: {ObjectId} } = require('takemytask-data')
require('takemytask-commons/ponyfills/xhr')
const context = require('./context')

context.API_URL = API_URL

context.storage = {}

describe('logic - add message', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, adress, bankAcount, description, pricingHour, jobCategories, workingDistance, workerId, coment, userId, chatId, newMessage

    beforeEach(async () => {
        await User.deleteMany()
        await Worker.deleteMany()
        await Chat.deleteMany()

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

        const chat = await Chat.create({
            user: ObjectId(userId), 
            worker: ObjectId(workerId), 
            date: new Date
        })

        message = 'hello' + worker.name

        newMessage = `message-${random()}`

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
    describe('user exists', () => {
        beforeEach(async () => {
            const user = await User.create({name, surname, email, password, adress})

            userId = user._id

            return jwtPromised.sign({ sub: user.id }, SECRET)
                .then((token) => context.storage.token = token)
        })

        it('should succeed on adding message', async () => {

            await addMessage(chatId, newMessage)

            const results = await Chat.find()

            const [chat] = results

            expect(chat).to.exist
            expect(chat.messages[0].userId.toString()).to.equal(userId.toString())
            expect(chat.messages[0].text).to.be.equal(newMessage)
        })

        it('should succeed on adding coment', async () => {
            try{

                await addMessage(chatId, "")

            }catch({message}){
                expect(message).to.exist
                expect(message).to.equal("string is empty or blank")
            }
        })

        it('sould fail when chat id dont exist', async () => {
        
            const result = await addMessage('5ee0ed9a603a0a4f3c650fe1', newMessage)
                .then()
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`chat with id 5ee0ed9a603a0a4f3c650fe1 dont exists`)
                })
            
        })
    })

    describe('User dont exists', () => {
        let fakeId
        beforeEach(async() => {
            fakeId = '5ee0ed9a603a0a4f3c650fe1'
            return jwtPromised.sign({ sub: fakeId }, SECRET)
                .then((token) => context.storage.token = token)
        })
        it('sould fail when user id dont exitst', async () => {
        
            const result = await addMessage(chatId, newMessage)
                .then()
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`user with id ${fakeId} dont exists`)
                })
            
        })
    })

    afterEach(() => Worker.deleteMany(), User.deleteMany(), Chat.deleteMany())

    after(mongoose.disconnect)
})