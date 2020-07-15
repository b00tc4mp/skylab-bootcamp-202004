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
const AsyncStorage = require('not-async-storage')

context.API_URL = API_URL
context.storage = AsyncStorage

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
        await context.storage.setItem('token',token)
    })

    it('Sould success no to find a book because it is your', async() => {
        query = 'title'

        const [books] = await searchBook(query)

        expect(books).to.be.null
    })

    it('Sould success no to find a book another user', async() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        hash = await bcrypt.hash(password, 10)

        const _user = await User.create({ name, surname, email, password: hash })
        const _userId = _user.id

        const _token = await jwtPromised.sign({ sub: _userId}, SECRET)
        await context.storage.setItem('token',_token)

        query = 'title'

        const [books] = await searchBook(query)

        expect(books).to.exist
        expect(books.title).to.equal(title)
        expect(books.image).to.equal(image)
        expect(books.barCode).to.equal(barCode)
    })

    it('Sould fail on no find any book', async() => {
        query = 'jkadsfgdsgfhgsajdf'
        try {
            await searchBook(query)
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("This book doesn't exists")
        }
    })

    it('Sould fail to search a with a unexistent userId', async() => {

        userId = '5edf984ec1be038dc909f783'
        query = 'title'
        const _token = await jwtPromised.sign({ sub: userId}, SECRET)
        await context.storage.setItem('token',_token)

        try {
            await searchBook(query)
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("This user doesn't exists")
        }
    })


    it('should fail on non-string field', () => {
        expect(() => {
            searchBook(true)
        }).to.throw(TypeError, 'true is not a string')
        expect(() => {
            searchBook(123)
        }).to.throw(TypeError, '123 is not a string')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            searchBook('')
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