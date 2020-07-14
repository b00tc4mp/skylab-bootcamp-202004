require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const creatChat = require('./creat-chat')
const { random } = Math
const { expect } = require('chai')
require('takemytask-commons/polyfills/json')
const { models: {User, Worker, Chat }, mongoose: {ObjectId}, mongoose } = require('takemytask-data')
const bcrypt = require('bcryptjs')

describe('logic - creat chat', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, adress, nameW, surnameW, emailW, passwordW, adressW, bankAcountW, descriptionW, pricingHourW, jobCategoriesW, workingDistanceW, userId, workerId, chatMessage

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

        userId = user.id

        chatMessage = `chat-random-message${random()}`
    
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

    it('should succeed on creating a chat', async () => {
        await creatChat(userId, workerId, chatMessage)

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

    it('should fail on invalid argument', async () => {
        try{

            const result = await creatChat(undefined, workerId, chatMessage)
            expect(result).to.exist
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('undefined is not a string')
        }
    })



    // describe('when user already exists', () => {
    //     beforeEach(() => User.create({ name, surname, email, password, adress }))

    //     it('should fail on trying to register an existing user', async () => {
    //         try {
    //             await registerUser(name, surname, email, password, adress)

    //             throw new Error('should not reach this point')
    //         } catch (error) {
    //             expect(error).to.exist

    //             expect(error).to.be.an.instanceof(Error)
    //             expect(error.message).to.equal(`user with e-mail ${email} already exists`)
    //         }
    //     })
    // })

    afterEach(() => User.deleteMany(), Worker.deleteMany(), Chat.deleteMany())

    after(mongoose.disconnect)
})