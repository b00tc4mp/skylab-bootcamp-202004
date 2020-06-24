require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process
const { random } = Math
const retrieveBook = require('./retrieve-book')
const { expect } = require('chai')

require('books-commons/polyfills/json')

const { mongoose, models: { User, Book } } = require('books-data')
const bcrypt = require('bcryptjs')
const { errors: { VoidError } } = require('books-commons')

describe("retrieve-book", () => {
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

        title = `title-${random()}`;
        barCode = `${random()}`;
        travelKm = random();
        const book = await Book.create({ title, barCode, travelKm, ownerUserId: userId ,actualUserId: userId,});
        bookId = book.id;
    })

    it("should succeed add a retrieve a  book", async() => {
        const book = await retrieveBook(bookId)

        expect(book).to.exist
        expect(book.title).to.equal(title)
        expect(book.barCode).to.equal(barCode)
        expect(book.travelKm).to.equal(travelKm)
        expect(book.ownerUserId._id.toString()).to.equal(userId)
      
    })

    it("should fail to no exist a book", async() => {
        bookId = '5edf984ec1be038dc909f783'
        try {
            await retrieveBook(bookId)
            throw new Error('should not reach this point')
       } catch (error) {
           expect(error).to.exist
           expect(error).to.be.an.instanceof(Error)
           expect(error.message).to.equal(`book with id ${bookId} does not exist`)
       }
    })



    it('should fail on non-string field', () => {
        expect(() => {
            retrieveBook(true)
        }).to.throw(TypeError, 'true is not a string')
        expect(() => {
            retrieveBook(123)
        }).to.throw(TypeError, '123 is not a string')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            retrieveBook('')
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