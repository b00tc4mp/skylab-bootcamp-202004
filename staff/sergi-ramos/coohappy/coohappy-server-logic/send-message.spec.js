require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const { expect } = require('chai')
const { random } = Math
const sendMessage = require('./send-message')
const bcrypt = require('bcryptjs')
const { utils: { randomAccessCode } } = require('coohappy-commons')
const { mongoose } = require('coohappy-data')
const { mongoose: { ObjectId }, models: { User, Cohousing } } = require('coohappy-data')
const { errors: { VoidError } } = require('coohappy-commons')

let name, surname, email, password, hash, userId, nameCohousing, street, number, city, accessCode, message, date

describe('logic - udpate-cohousing', () => {

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

        message = `message-${random()}`
        date = new Date

        hash = await bcrypt.hash(password, 10)
        const user = await User.create({ name, surname, email, password: hash })
        userId = user.id
        let address = { street, number, city }
        await Cohousing.create({ name: nameCohousing, address, author: userId, accessCode, members: [userId] })
    })

    describe('when cohousing and user exist', () => {

        it('should success on send messages to chat', async () => {

            await sendMessage(userId, message, date)
            const cohousing = await Cohousing.findOne({ members: userId })
            expect(cohousing.messages).to.exist
            expect(cohousing.messages[0].message).to.equal(message)
            expect(cohousing.messages[0].date.toString()).to.equal(date.toString())
            expect(cohousing.messages[0].userId.toString()).to.equal(userId)

        })
    })

    
    describe('when cohousing does not exist', () => {
        
        it('should fail on send messages to chat when cohousing does not exist', async () => {
            
            try{
                await Cohousing.deleteMany()
                await sendMessage(userId, message, date)
                const cohousing = await Cohousing.findOne({ members: userId })

            }catch(error){
                expect(error).to.exist
                expect(error.message).to.equal(`user with id ${userId} has not a cohousing`)

            }   
        })

      
    })

    describe('sync errors', () => {

        it('on wrong type of data', () => {

            expect(() => sendMessage(userId, true, date)).to.throw(TypeError, 'true is not a string')
            expect(() => sendMessage(2, message, date)).to.throw(TypeError, '2 is not a string')
            expect(() => sendMessage(userId, message, 'hola')).to.throw(TypeError, 'hola is not a Date')
        })
    })


})



afterEach(() => User.deleteMany())

after(mongoose.disconnect)
