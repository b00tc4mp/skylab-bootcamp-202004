require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL  } } = process

const creatChat = require('./creat-chat')
const { random } = Math
const { expect } = require('chai')
require('takemytask-commons/polyfills/json')
const { mongoose, models: { User, Worker, Chat} } = require('takemytask-data')
const bcrypt = require('bcryptjs')
require('takemytask-commons/ponyfills/xhr')
const context = require('./context')
const { utils: { jwtPromised } } = require('takemytask-commons')

context.API_URL = API_URL

describe('logic - creat chat', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, adress, nameW, surnameW, emailW, passwordW, adressW, bankAcount, description, pricingHour, jobCategories, workingDistance, userId, workerId, chatMessage

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
        description = `description-${random()}`
        pricingHour = random()*10
        jobCategories = `jobCategories-${random()}`
        workingDistance = random()*10

        const hashW = await bcrypt.hash(password, 10)

        const worker = await Worker.create({name: nameW, surname: surnameW, email: emailW, password: hashW, adress, adressW, bankAcount, description, pricingHour, jobCategories, workingDistance})

        workerId = worker.id 
    })

    describe('user exists', () => {
        beforeEach(async () => {
            const user = await User.create({name, surname, email, password, adress})

            userId = user._id

            return jwtPromised.sign({ sub: user.id }, SECRET)
                .then((token) => context.storage.token = token)
            })
                    
            it('should succeed on creating a chat', async () => {
                await creatChat(workerId)
        
                const users = await User.find()
        
                const workers = await User.find()
        
                const [user] = users
        
                const [worker] = workers
        
                expect(user.chat[0]).to.exist
                expect(worker.chat[0]).to.exist
        
                const chats = await Chat.find()
        
                // expect(chats.length).to.equal(1)
        
                const [chat] = chats
        
                const [coments] = chat.messages
        
                // const chatUserId = [userId] = chat.message
                
                expect(coments.text).to.equal(`hello${nameW}`)
                expect(coments.userId.toString()).to.equal(userId.toString())
                expect(chat.user.toString()).to.equal(userId.toString())
                expect(chat.worker.toString()).to.equal(workerId.toString())
        
            })

       

    })

    describe('chat dont exists', () => {
        let fakeId
        beforeEach(async() => {
            fakeId = '5ee0ed9a603a0a4f3c650fe1'
            return jwtPromised.sign({ sub: fakeId }, SECRET)
                .then((token) => context.storage.token = token)
        })
        
        it('should fail on invalid user', async () => {
            try{
    
                const result = await creatChat(fakeId)
                expect(result).to.exist
            }catch(error){
                expect(error).to.exist
                expect(error.message).to.equal('user dont exists')
            }
        })
    })



    afterEach(() => User.deleteMany(), Worker.deleteMany(), Chat.deleteMany())

    after(mongoose.disconnect)
})