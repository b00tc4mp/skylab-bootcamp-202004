require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process
const { random } = Math
const deleteReceivedMessages = require('./delete-received-messages')
const { expect } = require('chai')

require('books-commons/polyfills/json')

const { mongoose, models: { User, Book, Message } } = require('books-data')
const bcrypt = require('bcryptjs')
const { errors: { VoidError } } = require('books-commons')

describe("delete-recieved-messages", () => {
    let name, surname, email, password, encryptedPassword, userId;
    let secondName, secondSurname, secondEmail, secondPassword, secondEncryptedPassword, secondUserId;
    let title, barCode, travelKm, bookId;
    let textMessage, messageId;

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

        const message = await Message.create({ fromUserId:secondUserId, toUserId:userId, bookId, textMessage, date: new Date()});
        messageId = message.id
    })

    it("should succeed on delete a message", async() => {
        await deleteReceivedMessages(userId,messageId)

        const message = await Message.findById(messageId)
       
        expect(message).to.be.null
    })

    it('Sould fail to delete another message', async () => {
        const message = await Message.create({ fromUserId:userId, toUserId:secondUserId, bookId, textMessage, date: new Date()});
        messageId = message.id


        try {
            await deleteReceivedMessages(userId,messageId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("You can`t delete this message because it not yours!")
        }
    })

    it('Sould fail dont find second User', async () => {
        userId = '5edf984ec1be038dc909f783'

        try {
            await deleteReceivedMessages(userId,messageId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })

    it('Sould fail dont find any book', async () => {
        messageId = '5edf984ec1be038dc909f783'

        try {
            await deleteReceivedMessages(userId,messageId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`message with id ${messageId} does not exist`)
        }
    })

    it('should fail on non-string field', () => {
        expect(() => {
            deleteReceivedMessages(true,messageId)
        }).to.throw(TypeError, 'true is not a string')
        expect(() => {
            deleteReceivedMessages(userId,123)
        }).to.throw(TypeError, '123 is not a string')
    })

    it('should fail on non-string field', () => {
      
        expect(() => {
            deleteReceivedMessages('',messageId)
        }).to.throw(VoidError, 'string is empty or blank')
        expect(() => {
            deleteReceivedMessages(userId,'')
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