require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process
const { random } = Math
const listMyBooks = require('./list-my-books')
const { expect } = require('chai')

require('books-commons/polyfills/json')

const { mongoose, models: { User, Book} } = require('books-data')
const bcrypt = require('bcryptjs')
const { errors: { VoidError } } = require('books-commons')

describe("list-my-books", () => {
    let name, surname, email, password, encryptedPassword, userId;
    let title, barCode, travelKm, bookId;

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

    })

    it("should succeed add a accept share book", async() => {
        const books = await listMyBooks(userId)

        books.forEach(book=>{
            expect(book).to.exist
            expect(book.id).to.equal(bookId)
            expect(book.ownerUserId.toString()).to.equal(userId)
            expect(book.actualUserId.toString()).to.equal(userId)
        })
    })

    it('Sould fail dont find userId', async () => {
        userId = '5edf984ec1be038dc909f783'

        try {
            await listMyBooks(userId)
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
            await listMyBooks(userId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("Dont`t have books in your library")
        }
    })


    it('should fail on non-string field', () => {
        expect(() => {
            listMyBooks(true)
        }).to.throw(TypeError, 'true is not a string')
        expect(() => {
            listMyBooks(123)
        }).to.throw(TypeError, '123 is not a string')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            listMyBooks('')
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