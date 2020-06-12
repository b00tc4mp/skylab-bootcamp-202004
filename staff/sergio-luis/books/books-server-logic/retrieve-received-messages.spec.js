require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process
const { random } = Math
const retriveMessages = require('./retrieve-received-messages')
const { expect } = require('chai')

require('books-commons/polyfills/json')

const { mongoose, models: { User, Book, Message } } = require('books-data')
const bcrypt = require('bcryptjs')
const { errors: { VoidError } } = require('books-commons')

describe("retrieve-received-messages", () => {
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

        const message = await Message.create({ fromUserId:userId, toUserId:secondUserId, bookId, textMessage, date: new Date()});
        messageId = message.id
    })

    it("should succeed to retrieve a message", async() => {
        const [message] = await retriveMessages(secondUserId)
        
        expect(message).to.exist
        expect(message.fromUserId.name).to.equal(name)
        expect(message.toUserId.toString()).to.equal(secondUserId)
        expect(message.bookId.title).to.equal(title)
        expect(message.textMessage).to.equal(textMessage)

    })

    it('Sould fail dont find user', async () => {
        userId = '5edf984ec1be038dc909f783'

        try {
            await retriveMessages(userId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })

    it('Sould fail dont find any message', async () => {

       
        try {
            await retriveMessages(userId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("the user don`t have recieved messages")
        }
    })



    it('should fail on non-string field', () => {
        expect(() => {
            retriveMessages(true)
        }).to.throw(TypeError, 'true is not a string')
        expect(() => {
            retriveMessages( 123)
        }).to.throw(TypeError, '123 is not a string')
    })

    it('should fail on non-string field', () => {
      
        expect(() => {
            retriveMessages('')
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