require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL ,SECRET} } = process
const { random } = Math
const  requestBook= require('./add-requested-book')
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

describe("client-logic-add-requested-book", () => {
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
        const book = await Book.create({ title, barCode, travelKm, ownerUserId: secondUserId ,actualUserId: secondUserId,});
        bookId = book.id;

        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',token)
    })

    it("should succeed add a request book", async() => {
        await requestBook(bookId)

        const user = await User.findById(userId)

        expect(user).to.exist

        user.requestedBooks.forEach(book=>{
            expect(book.toString()).to.equal(bookId)
        })
      
    })
    it("should fail to can`t request book in my posession", async() => {
        title = `title-${random()}`;
        barCode = `${random()}`;
        travelKm = random();
        const book = await Book.create({ title, barCode, travelKm, ownerUserId: userId ,actualUserId: userId,});
        bookId = book.id;

        try {
            await requestBook(bookId)
       } catch (error) {
           expect(error).to.exist
           expect(error).to.be.an.instanceof(Error)
           expect(error.message).to.equal(`You can't request the book because you are the actual poseidor`)
       }
    })

    it('Sould fail dont find user', async () => {
        userId = '5edf984ec1be038dc909f783'
        const _token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',_token)

        try {
             await requestBook( bookId)
             throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })

    it('Sould fail dont find bookId', async () => {
        bookId = '5edf984ec1be038dc909f783'

        try {
            await requestBook(bookId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`book with id ${bookId} does not exist`)
        }
    })


    it('should fail on non-string field', () => {
        expect(() => {
            requestBook(true)
        }).to.throw(TypeError, 'true is not a string')
        expect(() => {
            requestBook(123)
        }).to.throw(TypeError, '123 is not a string')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            requestBook('', bookId)
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