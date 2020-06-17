require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL ,SECRET} } = process
const { random } = Math
const deleteBook= require('./delete-book')
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


describe('client-logic-delete-book', () => {
    let name, surname, email, password, encryptedPassword, userId;
    let title, barCode, travelKm, bookId,token;
    let deletedBook;

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

        title = `title-${random()}`;
        barCode = `${random()}`;
        travelKm = random();
        const book = await Book.create({ title, barCode, travelKm, ownerUserId: userId ,actualUserId: userId,});
        bookId = book.id;

        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',token)

    })

    it('Sould success to delete a book', async() => {
        deletedBook = await deleteBook(bookId)

        expect(deletedBook).to.be.undefined

        const book = await Book.findById(bookId)

        expect(book).to.be.null
    })

    it('Sould fail to delete a book dont find user', async() => {

        userId = '5edf984ec1be038dc909f783'
        const _token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',_token)

        try {
            await deleteBook(bookId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("This user doesn't exists")
        }
    })

    it('Sould fail to delete a book don`t find a book', async() => {
        bookId = '5edfa26edf0b6a9235ee2539'

        try {
            await deleteBook(bookId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("This book doesn't exists")
        }
    })

    it('Sould fail to try delete a book with a userId diferent of the owner', async() => {

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        hash = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, email, password: hash })

        userId = user.id

        const _token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',_token)
        try {
            await deleteBook(bookId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("You can`t delete this book because it not yours!")
        }
    })


    it('should fail on non-string field', () => {
        expect(() => {
            deleteBook(123)
        }).to.throw(TypeError, '123 is not a string')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            deleteBook('')
        }).to.throw(VoidError, 'string is empty or blank')
    })


    afterEach(async() => {
       await User.deleteMany()
       await Book.deleteMany()
    })

    after (async() => {
        return await mongoose.disconnect();
    })
})