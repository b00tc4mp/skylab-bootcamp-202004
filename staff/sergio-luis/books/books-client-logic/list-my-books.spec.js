require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL ,SECRET} } = process
const { random } = Math
const listMyBooks= require('./list-my-books')
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


describe("client-logic-list-my-books", () => {
    let name, surname, email, password, encryptedPassword, userId;
    let title, barCode, travelKm, bookId;
    let token;

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
        const book = await Book.create({ title, barCode, travelKm, ownerUserId: userId ,actualUserId: userId,});
        bookId = book.id;

        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',token)
    })

    it("should succeed to list books", async() => {
        const books = await listMyBooks()

        books.forEach(book=>{
            expect(book).to.exist
            expect(book.id).to.equal(bookId)
            expect(book.ownerUserId.toString()).to.equal(userId)
            expect(book.actualUserId.toString()).to.equal(userId)
        })
    })

    it('Sould fail dont find userId', async () => {
        userId = '5edf984ec1be038dc909f783'
        const _token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',_token)
        try {
            await listMyBooks()
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })

    it('Sould fail don`t have any book in the library of books', async () => {
        await Book.deleteOne({_id:bookId})

        try {
            await listMyBooks()
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("Dont`t have books in your library")
        }
    })

    afterEach(async() => {
        await Promise.all([User.deleteMany(), Book.deleteMany()]);
    })

    after (async() => {
        await Promise.all([User.deleteMany(), Book.deleteMany()]);
        await mongoose.disconnect();
    })
})