require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, JWT_SECRET } } = process

const { expect } = require('chai')
const { random } = Math
const sendMessage = require('./send-message')
const bcrypt = require('bcryptjs')

const jwtPromised = require('jsonwebtoken')
global.fetch = require('node-fetch')
const notAsyncStorage = require('not-async-storage')
const logic = require('.')
const atob = require('atob')

const { utils: { randomAccessCode } } = require('coohappy-commons')
const { mongoose } = require('coohappy-data')
const { mongoose: { ObjectId }, models: { User, Cohousing } } = require('coohappy-data')
const { errors: { VoidError } } = require('coohappy-commons')

let name, surname, email, password, hash, userId, nameCohousing, street, number, city, accessCode, message, date, laundryNum

describe('logic - send-message', () => {

    before(() => mongoose.connect(MONGODB_URL))

    beforeEach(async () => {

        await User.deleteMany()

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

        message = `message-${random()}`
        date = {
            stringDay: "Friday",
            day: 19,
            month: "June",
            hour: "10:22"
          }


        hash = await bcrypt.hash(password, 10)
        const user = await User.create({ name, surname, email, password: hash })
        userId = user.id
        const token = jwtPromised.sign({ sub: userId }, JWT_SECRET)
        await logic.__context__.storage.setItem('TOKEN', token)
        let address = { street, number, city }
        await Cohousing.create({ name: nameCohousing, address, author: userId, accessCode, members: [userId], laundryNum })
    })

    describe('when cohousing and user exist', () => {

        it('should success on send messages to chat', async () => {

            await sendMessage(message, date)
            const cohousing = await Cohousing.findOne({ members: userId })
            expect(cohousing.messages).to.exist
            expect(cohousing.messages[0].message).to.equal(message)
            expect(cohousing.messages[0].date).to.exist
            expect(cohousing.messages[0].userId.toString()).to.equal(userId)

        })
    })

    
    describe('when cohousing does not exist', () => {
        
        it('should fail on send messages to chat when cohousing does not exist', async () => {
            
            try{
                await Cohousing.deleteMany()
                await sendMessage(message, date)
                const cohousing = await Cohousing.findOne({ members: userId })

            }catch(error){
                expect(error).to.exist
                expect(error.message).to.equal(`user with id ${userId} has not a cohousing`)

            }   
        })

      
    })

    describe('sync errors', () => {

        it('on wrong type of data', () => {

            expect(() => sendMessage(true, date)).to.throw(Error, 'true is not a string')
            expect(() => sendMessage(message, undefined)).to.throw(Error, 'undefined is not an object')
        })
    })


})



afterEach(() => User.deleteMany())

after(mongoose.disconnect)
