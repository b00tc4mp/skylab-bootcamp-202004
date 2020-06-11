require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const { expect } = require('chai')
const { random } = Math
const retrieveMessages = require('./retrieve-messages')
const bcrypt = require('bcryptjs')
const { utils: { randomAccessCode } } = require('coohappy-commons')
const { mongoose } = require('coohappy-data')
const { mongoose: { ObjectId }, models: { User, Cohousing, Message } } = require('coohappy-data')
const { errors: { VoidError } } = require('coohappy-commons')

let name, surname, email, password, hash, userId, nameCohousing, street, number, city, accessCode, message, date, laundryNum

describe('logic - retrieve-messages', () => {

    before(() => mongoose.connect(MONGODB_URL))

    beforeEach(async () => {

        await User.deleteMany()
        await Cohousing.deleteMany()
        await Message.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        nameCohousing = `name-${random()}`
        street = `street-${random()}`
        number = random()
        city = `city-${random()}`
        accessCode = randomAccessCode(name)
        laundryNum = 4

        singleMessage = `message-${random()}`
        date = (new Date).toString()



        hash = await bcrypt.hash(password, 10)
        const user = await User.create({ name, surname, email, password: hash })
        userId = user.id
        let address = { street, number, city }
        await Cohousing.create({ name: nameCohousing, address, author: userId, accessCode, members: [userId], laundryNum })

        
    })

    describe('when there are some messages to retrieve', () => {

        beforeEach( async () => {
            const cohousing = await Cohousing.findOne({ members: userId })
            const _message = new Message({ userId, message: singleMessage, date })
    
            cohousing.messages.push(_message)
            await cohousing.save()
        })

        it('should success on retrieve messages', async () => {

            const allMessages = await retrieveMessages(userId)
            const { messages } = allMessages
            expect(messages).to.exist
            expect(messages[0].userId._id.toString()).to.equal(userId)
            expect(messages[0].message).to.equal(singleMessage)
            expect(messages[0].date).to.equal(date)

        })
    })

    describe('when there are not messages to retrieve', () => {
        let allMessages
      
        it('should not retrieve any message', async () => {

           try{
               allMessages = await retrieveMessages(userId)

           }catch(error){
               expect(error).to.exist
               expect(error.message).to.equal('no messages yet')

           }
        })
    })


    describe('sync errors', () => {

        it('on wrong type of data', () => {

            expect(() => retrieveMessages(true)).to.throw(TypeError, 'true is not a string')
            expect(() => retrieveMessages(undefined)).to.throw(TypeError, 'undefined is not a string')
            expect(() => retrieveMessages(2)).to.throw(TypeError, '2 is not a string')
        })
    })





    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})