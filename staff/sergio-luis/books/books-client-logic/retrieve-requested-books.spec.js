require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL,SECRET } } = process

const retrieveRequestedBooks = require('./retrieve-requested-books')
const { random } = Math
const { expect } = require('chai')
require('books-commons/polyfills/json')
const { errors: { VoidError} } = require('books-commons')
const {jwtPromised} = require('books-node-commons')
const { mongoose, models: { User,Book,Message } } = require('books-data')
const bcrypt = require('bcryptjs')
global.fetch = require('node-fetch')
const context = require('./context')
const AsyncStorage = require('not-async-storage')

context.API_URL = API_URL
context.storage = AsyncStorage

describe("client-logic-retrieve-requested-book", () => {
    let name, surname, email, password, encryptedPassword, userId;
    let secondName, secondSurname, secondEmail, secondPassword, secondEncryptedPassword, secondUserId;
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
        const book = await Book.create({ title, barCode, travelKm, ownerUserId: secondUserId ,actualUserId: secondUserId,});
        bookId = book.id;

        token = await jwtPromised.sign({ sub: secondUserId}, SECRET)
        await context.storage.setItem('token',token)
    })

    it("should succeed retrieve a requested book", async() => {
        await User.findByIdAndUpdate(secondUserId, {$addToSet: {requestedBooks : bookId }})

        const books = await retrieveRequestedBooks()

        books.forEach(book=>{
            expect(book).to.exist
            expect(book.id).to.equal(bookId)
            expect(book.ownerUserId.toString()).to.equal(secondUserId)
            expect(book.actualUserId.toString()).to.equal(secondUserId)
            expect(book.title.toString()).to.equal(title)
        })
    })

    it('Sould fail dont find userId', async () => {
        userId = '5edf984ec1be038dc909f783'

        const _token = await jwtPromised.sign({ sub: userId}, SECRET)
        await context.storage.setItem('token',_token)
        try {
            await retrieveRequestedBooks()
            throw new Error ('Sould not arraive to this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })

    it('Sould fail don`t have any book in the library of books', async () => {

        try {
            await retrieveRequestedBooks()
            throw new Error ('Sould not arraive to this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("you don`t have any books requested")
        }
    })

    afterEach(async() => {
        await Promise.all([User.deleteMany(), Book.deleteMany()]);
    })

    after (async() => {
        await Promise.all([User.deleteMany(), Book.deleteMany()]);
        return await mongoose.disconnect();
    })
})