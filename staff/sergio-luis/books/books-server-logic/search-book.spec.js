require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process
const { random } = Math
const searchBook = require('./search-book')
const { expect } = require('chai')

require('books-commons/polyfills/json')

const { mongoose, models: { User, Book } } = require('books-data')
const bcrypt = require('bcryptjs')
const { errors: { VoidError } } = require('books-commons')

describe('server-logic-search-book', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash, createdBook, bookId,query


    beforeEach(async() => {
        await [Book.deleteMany(),User.deleteMany()]
       
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        hash = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, email, password: hash })

        userId = user.id

        title = "Lord of the Flies"
        image = "http://books.google.com/books/content?id=z--HMbPXdD0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        description = "Critical essays and notes on the novel and its author accompany the story of a group of British schoolboys marooned on a desert island"
        barCode = "0399506438"

        createdBook = await Book.create({
            title,
            image,
            description,
            barCode,
            ownerUserId: userId,
            actualUserId: userId,
            travelKm:0
        })

        bookId = createdBook._id.toString()

    })

    it('Sould success no find a book because is your', async() => {
        query = 'lord'

        const [books] = await searchBook(userId,query)
        expect(books).to.be.undefined
    
    })
    it('Sould success to find a book ', async() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        hash = await bcrypt.hash(password, 10)
        const user = await User.create({ name, surname, email, password: hash })

        userId = user.id
        query = 'lord'


        const [books] = await searchBook(userId,query)
        expect(books).to.be.exist
        expect(books.title).to.equal(title)
        expect(books.image).to.equal(image)
        expect(books.description).to.equal(description)
        expect(books.barCode).to.equal(barCode)
    
    })

    it('Sould fail on no find any book', async() => {
        query = 'jkadsfgdsgfhgsajdf'
        try {
            await searchBook(userId,query)
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("This book doesn't exists")
        }
    })

    it('Sould fail to search a with a unexistent userId', async() => {

        userId = '5edf984ec1be038dc909f783'
        try {
            await searchBook(userId, bookId)
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