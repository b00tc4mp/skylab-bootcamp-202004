require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL ,SECRET} } = process
const { random } = Math
const shareBook = require('./accepted-share-book')
const { expect } = require('chai')
require('books-commons/polyfills/json')

const { mongoose, models: { User, Book} } = require('books-data')
const { errors: { VoidError } } = require('books-commons')
const {jwtPromised} = require('books-node-commons')
const bcrypt = require('bcryptjs')
global.fetch = require('node-fetch')
const context = require('./context')
const AsyncStorage = require('not-async-storage')

context.API_URL = API_URL
context.storage = AsyncStorage

describe("client-logic-accept-share-book", () => {
    let name, surname, email, password, encryptedPassword, userId;
    let secondName, secondSurname, secondEmail, secondPassword, secondEncryptedPassword, secondUserId;
    let title, barCode, travelKm, bookId,token;

    before (async() => {
        await mongoose.connect(MONGODB_URL, {unifiedTopology: true});
        await Promise.all([User.deleteMany(), Book.deleteMany()]);
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
        const book = await Book.create({ title, barCode, travelKm, ownerUserId: userId ,actualUserId: userId});
        bookId = book.id;

        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',token);
    })

    it("should succeed add a accept share book", async() => {
        await shareBook(secondUserId,bookId)

        const book = await Book.findById(bookId)
   
        expect(book).to.exist
        expect(book.actualUserId.toString()).to.equal(secondUserId)
        expect(book.ownerUserId.toString()).to.equal(userId) 
    })

    it("should fail to can`t share a book when you don`t are the actualUser", async() => {
        const _token = await jwtPromised.sign({ sub: secondUserId }, SECRET)
        await context.storage.setItem('token',_token);
        try {
            await shareBook(userId,bookId)
            throw new Error('should not reach this point')
       } catch (error) {
           expect(error).to.exist
           expect(error).to.be.an.instanceof(Error)
           expect(error.message).to.equal("The user can`t share the book")
       }
    })



    it('Sould fail dont find userId', async () => {
        userId = '5edf984ec1be038dc909f783'
        const _token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',_token);
        try {
            await shareBook(secondUserId,bookId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })

    it('Sould fail dont find secondUserId', async () => {
        secondUserId = '5edf984ec1be038dc909f783'

        try {
            await shareBook(secondUserId,bookId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${secondUserId} does not exist`)
        }
    })
    it('Sould fail dont find bookId', async () => {
        bookId = '5edf984ec1be038dc909f783'

        try {
            await shareBook(secondUserId,bookId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`book with id ${bookId} does not exist`)
        }
    })


    it('should fail on non-string field', () => {
        expect(() => {
            shareBook(123,bookId)
        }).to.throw(TypeError, '123 is not a string')
        expect(() => {
            shareBook(secondUserId,false)
        }).to.throw(TypeError, 'false is not a string')
    })

    it('should fail on non-string field', () => {
   
        expect(() => {
            shareBook('',bookId)
        }).to.throw(VoidError, 'string is empty or blank')
        expect(() => {
            shareBook(secondUserId,'')
        }).to.throw(VoidError, 'string is empty or blank')
    })

    afterEach(async() => {
        await Promise.all([User.deleteMany(), Book.deleteMany()]);
    })

    after (async() => {
        await Promise.all([User.deleteMany(), Book.deleteMany()]);
        await mongoose.disconnect();
    })
})