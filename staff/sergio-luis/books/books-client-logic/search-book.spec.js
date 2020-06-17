require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL,SECRET } } = process

const searchBook = require('./search-book')
const { random } = Math
const { expect } = require('chai')
require('books-commons/polyfills/json')
const { errors: { VoidError} } = require('books-commons')
const { mongoose, models: { User,Book } } = require('books-data')
const {jwtPromised} = require('books-node-commons')
const bcrypt = require('bcryptjs')
global.fetch = require('node-fetch')
const context = require('./context')
context.API_URL = API_URL


describe('client-logic-search-book', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash;
    let title,barCode,travelKm, bookId,query,token;

    beforeEach(async() => {
        await [Book.deleteMany(),User.deleteMany()]
       
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        hash = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, email, password: hash })
        userId = user.id

        title = `title-${random()}`;
        barCode = `${random()}`;
        image = `http://books.google.com/books/content?id=z--HMbPXdD0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`;
        travelKm = random();
        const book = await Book.create({ title, barCode, image,travelKm, ownerUserId: userId ,actualUserId: userId,});
        bookId = book.id;
       
        token = await jwtPromised.sign({ sub: userId}, SECRET)
    })

    it('Sould success to find a book', async() => {
        query = 'title'

        const [books] = await searchBook(token,query)

        expect(books).to.exist
        expect(books.title).to.equal(title)
        expect(books.image).to.equal(image)
        expect(books.barCode).to.equal(barCode)
        expect(books.actualUserId.toString()).to.equal(userId)
    })

    it('Sould fail on no find any book', async() => {
        query = 'jkadsfgdsgfhgsajdf'
        try {
            await searchBook(token,query)
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("This book doesn't exists")
        }
    })

    it('Sould fail to search a with a unexistent userId', async() => {

        userId = '5edf984ec1be038dc909f783'

        const _token = await jwtPromised.sign({ sub: userId}, SECRET)

        try {
            await searchBook(_token, bookId)
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("This user doesn't exists")
        }
    })


    it('should fail on non-string field', () => {
        expect(() => {
            searchBook(true, 'book')
        }).to.throw(TypeError, 'true is not a string')
        expect(() => {
            searchBook(userId, 123)
        }).to.throw(TypeError, '123 is not a string')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            searchBook('', 'book')
        }).to.throw(VoidError, 'string is empty or blank')
        expect(() => {
            searchBook(userId, '')
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