require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL,SECRET } } = process

const sendMessage = require('./send-message')
const { random } = Math
const { expect } = require('chai')
require('books-commons/polyfills/json')
const { errors: { VoidError} } = require('books-commons')
const { mongoose, models: { User,Book,Message} } = require('books-data')
const {jwtPromised} = require('books-node-commons')
const bcrypt = require('bcryptjs')
global.fetch = require('node-fetch')
const context = require('./context')
const AsyncStorage = require('not-async-storage')

context.API_URL = API_URL
context.storage = AsyncStorage

describe("client-logic-sendMessage", () => {
    let name, surname, email, password, encryptedPassword, userId;
    let secondName, secondSurname, secondEmail, secondPassword, secondEncryptedPassword, secondUserId;
    let title, barCode, travelKm, bookId;
    let textMessage;

    before (async() => {
        await mongoose.connect(MONGODB_URL, {unifiedTopology: true});
        await Promise.all([User.deleteMany(), Book.deleteMany(), Message.deleteMany()]);
    })

    beforeEach(async() => {
        name = `name-${random()}`;
        surname = `surname-${random()}`;
        email = `email-${random()}@gmail.com`;
        password = `password-${random()}`;
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, surname, email, password: encryptedPassword });
        userId = user.id;

        secondName = `secondUser-${random()}`;
        secondSurname = `secondSurname-${random()}`;
        secondEmail = `secondEmail-${random()}@gmail.com`;
        secondPassword = `secondPassword-${random()}`;
        secondEncryptedPassword = await bcrypt.hash(secondPassword, 10);

        const secondUser = await User.create({ name: secondName, surname: secondSurname, email: secondEmail, password: secondEncryptedPassword })
        secondUserId = secondUser.id

        title = `title-${random()}`;
        barCode = `${random()}`;
        travelKm = random();
        const book = await Book.create({ title, barCode, travelKm, ownerUserId: userId });
        bookId = book.id;

        textMessage = `textMessage-${random()}`;
        token = await jwtPromised.sign({ sub: userId}, SECRET);
        await context.storage.setItem('token',token);

    })

    it("should succeed on sending a message", async() => {
        await sendMessage(secondUserId, bookId, textMessage)
        
        const [message] = await Message.find({ toUserId: secondUserId})

        expect(message).to.exist
        expect(message.fromUserId.toString()).to.equal(userId)
        expect(message.toUserId.toString()).to.equal(secondUserId)
        expect(message.bookId.toString()).to.equal(bookId)
        expect(message.textMessage).to.equal(textMessage)

    })
    it('Sould fail dont find user', async () => {
        userId = '5edf984ec1be038dc909f783'
        const _token = await jwtPromised.sign({ sub: userId}, SECRET);
        await context.storage.setItem('token',_token)
        try {
            await sendMessage(secondUserId, bookId, textMessage)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })

    it('Sould fail dont find second User', async () => {
        secondUserId = '5edf984ec1be038dc909f783'

        try {
            await sendMessage(secondUserId, bookId, textMessage)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${secondUserId} does not exist`)
        }
    })

    it('Sould fail dont find any book', async () => {
        bookId = '5edf984ec1be038dc909f783'

        try {
            await sendMessage(secondUserId, bookId, textMessage)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`book with id ${bookId} does not exist`)
        }
    })

    it('should fail on non-string field', () => {
        expect(() => {
            sendMessage(123, bookId, textMessage)
        }).to.throw(TypeError, '123 is not a string')
        expect(() => {
            sendMessage(secondUserId, 123, textMessage)
        }).to.throw(TypeError, '123 is not a string')
        expect(() => {
            sendMessage(secondUserId, bookId, false)
        }).to.throw(TypeError, 'false is not a string')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            sendMessage('', bookId, textMessage)
        }).to.throw(VoidError, 'string is empty or blank')
        expect(() => {
            sendMessage(secondUserId, '', textMessage)
        }).to.throw(VoidError, 'string is empty or blank')
        expect(() => {
            sendMessage(secondUserId, bookId, '')
        }).to.throw(VoidError, 'string is empty or blank')

    })

    afterEach(async() => {
        await Promise.all([User.deleteMany(), Book.deleteMany(), Message.deleteMany()]);
    })

    after (async() => {
        await Promise.all([User.deleteMany(), Book.deleteMany(), Message.deleteMany()]);
        await mongoose.disconnect();
    })
})